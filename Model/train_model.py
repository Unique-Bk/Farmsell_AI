import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.ensemble import RandomForestRegressor
from sklearn.pipeline import Pipeline
from sklearn.metrics import mean_absolute_error


# Load dataset
data = pd.read_csv("../data/crop_prices.csv")

# Features
X = data[
    [
        "crop",
        "month",
        "market",
        "temperature",
        "rainfall"
    ]
]

# Target
y = data["price"]


# Categorical columns
categorical_features = [
    "crop",
    "market"
]

# Numerical columns
numerical_features = [
    "month",
    "temperature",
    "rainfall"
]


# Preprocessing
preprocessor = ColumnTransformer(
    transformers=[
        (
            "categorical",
            OneHotEncoder(handle_unknown="ignore"),
            categorical_features
        )
    ],
    remainder="passthrough"
)


# ML model
model = RandomForestRegressor(
    n_estimators=200,
    random_state=42
)


# Complete pipeline
pipeline = Pipeline(
    steps=[
        ("preprocessor", preprocessor),
        ("model", model)
    ]
)


# Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)


# Train
pipeline.fit(X_train, y_train)


# Test
predictions = pipeline.predict(X_test)

mae = mean_absolute_error(
    y_test,
    predictions
)

print("Model trained successfully!")
print("Mean Absolute Error:", round(mae, 2))


# Save model
joblib.dump(
    pipeline,
    "price_model.pkl"
)

print("Model saved as price_model.pkl")