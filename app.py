from flask import Flask, render_template, request, jsonify
import joblib
import math

app = Flask(__name__)

# Load trained model
model = joblib.load("model/price_model.pkl")


# Market information
MARKETS = {
    "Meerut": {
        "distance": 15,
        "transport_rate": 25
    },
    "Muzaffarnagar": {
        "distance": 40,
        "transport_rate": 25
    },
    "Delhi": {
        "distance": 70,
        "transport_rate": 30
    }
}


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/predict", methods=["POST"])
def predict():

    data = request.get_json()

    crop = data["crop"]
    month = int(data["month"])
    market = data["market"]

    temperature = float(
        data.get("temperature", 25)
    )

    rainfall = float(
        data.get("rainfall", 50)
    )

    quantity = float(
        data.get("quantity", 1)
    )

    # Prediction input
    input_data = [{
        "crop": crop,
        "month": month,
        "market": market,
        "temperature": temperature,
        "rainfall": rainfall
    }]

    # Predict price
    predicted_price = model.predict(
        input_data
    )[0]

    # Market information
    market_info = MARKETS[market]

    distance = market_info["distance"]
    transport_rate = market_info["transport_rate"]

    # Transport cost
    transport_cost = (
        distance *
        transport_rate
    )

    # Revenue
    revenue = (
        predicted_price *
        quantity
    )

    # Other estimated expenses
    other_cost = revenue * 0.03

    # Net return
    net_return = (
        revenue
        - transport_cost
        - other_cost
    )

    return jsonify({
        "predicted_price": round(
            predicted_price, 2
        ),
        "revenue": round(
            revenue, 2
        ),
        "transport_cost": round(
            transport_cost, 2
        ),
        "other_cost": round(
            other_cost, 2
        ),
        "net_return": round(
            net_return, 2
        ),
        "distance": distance
    })


if __name__ == "__main__":
    app.run(
        debug=True
    )