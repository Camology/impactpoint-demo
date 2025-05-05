For anyone else reviewing this, this was made for submission in an interview process with a company. The code will be archived once the interview process is complete.

Should be able to run this by just running ./startup.sh from the react-frontend folder and ./bootstrap.sh from the python-flask-backend folder.

Does assume you have python3.13 and yarn installed

Users are defined in python-flask-backend/data/users.csv

To remove data from the chart just click on it from the legend, it will cross out and remove itself from the chart

What I worked on: 

I first started on the backend, its flask/gunicorn based, loads the provided iris.csv as a fake "database" with pandas, similarly loads a list of "users" to login with and permissions are set with. Then I made some standard APIs for logging in, getting users permissions, and retrieving data by either variety (from permissions) or all of the data (for admins)

After this was working correctly and tested via curl (postman eventually) I started on the frontend. I am a bit rusty with react but enough tutorials exist online that I got this working in a nice enough state. You start at a login page where any user from the users.csv will work, no password field is currently used as per the instructions. Once you login you are presented with the data corresponding to that users permissions, and a slider along the Y-axis to limit the range of values. You can flip between night and light mode on here as well as the login page, it should persist across both, but the data is reset when toggling. You can then log out as needed.

For what I prioritized:

On the backend I prioritized just the simple loading of data/users and returning that data, no rate limiting and only minor exception handling. With more time this would be a real backend with sqlalchemy and nice models returning data, actual passwords for users, maybe some tracking data and actual permissions tables instead of a simple string representing their datasets.

On the frontend I prioritized the charting and I wanted to use tailwind-css and material UIs when possible. Charting with chartJS is relatively easy and I've used it before with vueJS so tried it out with react and it was also relatively straight forward. Once I had the charts figured out I worked on logging in and making sure that the correct dataset was returned for the correct user, and that the admin could see all datasets as requested. Then with a little more time I set two goals: night/light mode since I work in a dark environment and the white UI was hurting my eyes a bit and an admin mode for creating/modifying the users.csv file, I did get the night/light mode working and it even uses some nice buttons/icons from the material ui suite, I did not work on the admin management page but that would be the next step. Then more chart customization, persisting UI choices like your last used sliders, reseting sliders via button, chosen night/light mode, etc

A final last step would be to dockerize this entire tool or at least the front and backends separetely, but I am using a new mac computer and ran into issues I didn't want to spend my time debugging at the moment. And of course lots of code cleanup/enhancements
