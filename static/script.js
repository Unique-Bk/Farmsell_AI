async function predictPrice() {

    const crop =
        document.getElementById("crop").value;

    const month =
        document.getElementById("month").value;

    const market =
        document.getElementById("market").value;

    const quantity =
        document.getElementById("quantity").value;

    const temperature =
        document.getElementById("temperature").value;

    const rainfall =
        document.getElementById("rainfall").value;


    const response = await fetch(
        "/predict",
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify({

                crop: crop,
                month: month,
                market: market,
                quantity: quantity,
                temperature: temperature,
                rainfall: rainfall

            })
        }
    );


    const data =
        await response.json();


    document.getElementById(
        "result"
    ).innerHTML = `

        <div class="result-box">

            <div class="metric">
                🌾 Crop:
                <strong>${crop}</strong>
            </div>

            <div class="metric">
                🏪 Market:
                <strong>${market}</strong>
            </div>

            <div class="metric">
                📈 Predicted Price:
                <strong>
                    ₹${data.predicted_price}
                    /quintal
                </strong>
            </div>

            <div class="metric">
                💰 Expected Revenue:
                <strong>
                    ₹${data.revenue}
                </strong>
            </div>

            <div class="metric">
                🚚 Transport Cost:
                <strong>
                    ₹${data.transport_cost}
                </strong>
            </div>

            <div class="metric">
                💵 Estimated Net Return:
                <strong>
                    ₹${data.net_return}
                </strong>
            </div>

            <div class="metric">
                📍 Distance:
                <strong>
                    ${data.distance} km
                </strong>
            </div>

        </div>
    `;
}