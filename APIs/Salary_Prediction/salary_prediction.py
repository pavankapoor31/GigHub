import requests
import numpy as np
import pandas as pd 
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from flask import Flask, request

app = Flask(__name__)

@app.route("/salary_prediction", methods=["POST"])

def salary_prediction():
    input = request.get_json()
    data = pd.read_csv('Salary_data.csv')
    x = data.YearsExperience.values.reshape(-1,1)
    y = data.Salary.values.reshape(-1,1)
    X_train, X_test, y_train, y_test = train_test_split(x, y, test_size = 0.3, random_state = 0)
    model= LinearRegression()
    model.fit(x,y)
    pred_salary = int(model.predict([[input['exp']]]))
    print(pred_salary)
    return str(pred_salary)

# salary_prediction()

if __name__ == '__main__':
    app.run(debug=True, port=2303)