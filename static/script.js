async function predictPrice() {

    const button =
        document.querySelector(".analyze-button");

    const result =
        document.getElementById("result");


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


    /* Loading state */

    button.innerHTML =
        "⏳ Analyzing market...";

    button.disabled = true;


    result.innerHTML = `

        <div class="empty-result">

            <div class="empty-icon">
                🤖
            </div>

            <h3>
                AI is analyzing...
            </h3>

            <p>
                Processing crop price,
                market and transportation data.
            </p>

        </div>

    `;


    try {

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


        if (!response.ok) {
            throw new Error(
                "Server returned an error"
            );
        }


        /* Display results */

        result.innerHTML = `

            <div class="result-box">

                <div class="result-highlight">

                    <small>
                        ✨ AI ESTIMATE
                    </small>

                    <h2>
                        ${crop} • ${market}
                    </h2>

                    <p>
                        Estimated Net Return
                    </p>

                    <h2 class="net-return">
                        ₹${Number(
                            data.net_return
                        ).toLocaleString("en-IN")}
                    </h2>

                </div>


                <div class="result-grid">

                    <div class="metric">

                        <span>
                            📈 Predicted Price
                        </span>

                        <strong>
                            ₹${Number(
                                data.predicted_price
                            ).toLocaleString("en-IN")}
                            / quintal
                        </strong>

                    </div>


                    <div class="metric">

                        <span>
                            💰 Expected Revenue
                        </span>

                        <strong>
                            ₹${Number(
                                data.revenue
                            ).toLocaleString("en-IN")}
                        </strong>

                    </div>


                    <div class="metric">

                        <span>
                            🚚 Transport Cost
                        </span>

                        <strong>
                            ₹${Number(
                                data.transport_cost
                            ).toLocaleString("en-IN")}
                        </strong>

                    </div>


                    <div class="metric">

                        <span>
                            📍 Distance
                        </span>

                        <strong>
                            ${data.distance} km
                        </strong>

                    </div>

                </div>


                <div class="metric"
                     style="margin-top:10px;">

                    <span>
                        🌱 Other Estimated Costs
                    </span>

                    <strong>
                        ₹${Number(
                            data.other_cost
                        ).toLocaleString("en-IN")}
                    </strong>

                </div>


                <div
                    style="
                    margin-top:18px;
                    padding:15px;
                    border-radius:14px;
                    background:#eef9f1;
                    color:#34734e;
                    font-size:12px;
                    line-height:1.6;
                    "
                >

                    💡 <strong>FarmSell Insight:</strong>

                    The estimated return is calculated
                    using the predicted crop price,
                    quantity, transportation cost and
                    estimated additional expenses.

                </div>

            </div>

        `;

    }

    catch (error) {

        console.error(error);

        result.innerHTML = `

            <div class="empty-result">

                <div class="empty-icon">
                    ⚠️
                </div>

                <h3>
                    Something went wrong
                </h3>

                <p>
                    Could not connect to the AI
                    prediction service.
                    Make sure your Flask server
                    is running.
                </p>

            </div>

        `;

    }


    /* Restore button */

    button.innerHTML =
        "<span>🤖</span> Analyze Market <span class='arrow'>→</span>";

    button.disabled = false;

}