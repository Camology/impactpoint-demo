# my first flask app for showing iris flower data
from flask import Flask, jsonify, request
import pandas as pd
from flask_cors import CORS
import sys

# make the flask app
app = Flask(__name__)
CORS(app)  # let the react app talk to the flask app

try:
    # load the data from csv files
    users_df = pd.read_csv('data/users.csv')
    iris_df = pd.read_csv('data/iris.csv')

    # make the data types right
    users_df = users_df.astype({
        'email': 'string',
        'name': 'string', 
        'password': 'string',
        'permissions': 'string'
    })

    iris_df = iris_df.astype({
        'sepal.length': 'float64',
        'sepal.width': 'float64',
        'petal.length': 'float64',
        'petal.width': 'float64',
        'variety': 'string'
    })
except FileNotFoundError as e:
    print(f"Error: Couldn't find data files - {str(e)}")
    sys.exit(1)
except Exception as e:
    print(f"Error loading data: {str(e)}")
    sys.exit(1)

# routes for the api
@app.route('/api/iris-data', methods=['GET'])
def get_data():
    try:
        # send all the iris data
        return jsonify(iris_df.to_dict(orient='records'))
    except Exception as e:
        return jsonify({'error': f'Failed to get data: {str(e)}'}), 500

@app.route('/api/iris-data/variety/<string:variety>', methods=['GET'])
def get_data_by_variety(variety: str):
    try:
        # get iris data for one variety
        variety = f'Iris-{variety.replace("_user", "")}'
        filtered_df = iris_df[iris_df['variety'] == variety]
        
        if filtered_df.empty:
            return jsonify({'error': 'Variety not found'}), 404
        return jsonify(filtered_df.to_dict(orient='records'))
    except Exception as e:
        return jsonify({'error': f'Failed to get variety data: {str(e)}'}), 500

@app.route('/api/login', methods=['POST'])
def login():
    try:
        # check if user exists and send back their info
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400
            
        email = data.get('email', '').lower()
        if not email:
            return jsonify({'error': 'Email required'}), 400
        
        user = users_df[users_df['email'] == email]
        if user.empty:
            return jsonify({'error': 'User not found'}), 404
        
        return jsonify({
            'success': True,
            'user': {
                'email': email,
                'name': user.iloc[0]['name'],
                'permissions': user.iloc[0]['permissions']
            }
        })
    except Exception as e:
        return jsonify({'error': f'Login failed: {str(e)}'}), 500

@app.route('/api/users/<email>', methods=['GET'])
def get_user(email):
    try:
        # get info about one user
        user = users_df[users_df['email'] == email.lower()]
        
        if user.empty:
            return jsonify({'error': 'User not found'}), 404
        
        return jsonify({
            'email': email,
            'name': user.iloc[0]['name'],
            'permissions': user.iloc[0]['permissions']
        })
    except Exception as e:
        return jsonify({'error': f'Failed to get user: {str(e)}'}), 500

# start the server
if __name__ == '__main__':
    try:
        print("Starting Flask server...")
        app.run(port=5000)
    except KeyboardInterrupt:
        print("\nShutting down server...")
    except Exception as e:
        print(f"\nError running server: {str(e)}")
    finally:
        print("Server stopped.")
