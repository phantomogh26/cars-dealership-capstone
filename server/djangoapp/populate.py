from .models import CarMake, CarModel


def initiate():
    if CarMake.objects.exists():
        return

    car_make_data = [
        {"name": "NexGen", "description": "Producing reliable and stylish sedans and SUVs."},
        {"name": "Elegante", "description": "Luxury vehicles with a focus on comfort and design."},
        {"name": "Pulse", "description": "Sporty and performance-oriented vehicles."},
        {"name": "Quantum", "description": "Innovative electric and hybrid vehicles."},
        {"name": "Eclipse", "description": "Affordable and practical family vehicles."},
    ]

    car_makes = []
    for data in car_make_data:
        make = CarMake.objects.create(name=data["name"], description=data["description"])
        car_makes.append(make)

    car_model_data = [
        {"make": "NexGen", "name": "Voyager", "type": "SUV", "year": 2023},
        {"make": "NexGen", "name": "Sedanix", "type": "SEDAN", "year": 2022},
        {"make": "NexGen", "name": "Trailmaster", "type": "SUV", "year": 2023},
        {"make": "Elegante", "name": "Prestige", "type": "SEDAN", "year": 2023},
        {"make": "Elegante", "name": "Regal", "type": "SEDAN", "year": 2022},
        {"make": "Elegante", "name": "GrandTour", "type": "WAGON", "year": 2023},
        {"make": "Pulse", "name": "Racer", "type": "SEDAN", "year": 2023},
        {"make": "Pulse", "name": "Velocity", "type": "SUV", "year": 2022},
        {"make": "Pulse", "name": "Sprint", "type": "SEDAN", "year": 2023},
        {"make": "Quantum", "name": "Volt", "type": "SEDAN", "year": 2023},
        {"make": "Quantum", "name": "ElectraX", "type": "SUV", "year": 2023},
        {"make": "Quantum", "name": "HybridOne", "type": "SEDAN", "year": 2022},
        {"make": "Eclipse", "name": "Family Wagon", "type": "WAGON", "year": 2022},
        {"make": "Eclipse", "name": "Commuter", "type": "SEDAN", "year": 2023},
        {"make": "Eclipse", "name": "Explorer", "type": "SUV", "year": 2023},
    ]

    make_lookup = {m.name: m for m in car_makes}
    for data in car_model_data:
        CarModel.objects.create(
            car_make=make_lookup[data["make"]],
            name=data["name"],
            type=data["type"],
            year=data["year"],
        )
