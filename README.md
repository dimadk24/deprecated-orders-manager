# Orders manager

## Launching project:

1. Install [python3.6](https://www.python.org/downloads/) on your system.
2. Install [pipenv](https://pipenv.readthedocs.io/en/latest/install/) for managing virtual environments easily.
3. Clone project: `git clone https://github.com/DimaDK24/orders-manager.git`
4. Go to project folder: `cd orders-manager`
5. Create empty file `.env` in the project folder
6. Open `develop.env` file. Copy it's content to `.env` file
7. run `pipenv sync` in project root.
It will create virtual environment and install required packages
8. run `pipenv shell` to open shell of new virtual environment
9. run `python manage.py migrate` to apply all migrations
10. run `python manage.py createsuperuser` to create user
11. run `python manage.py runserver` to run django server
12. go to `127.0.0.1:8000` in your favorite browser
13. Enjoy application!
