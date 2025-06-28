def celsius_ke_fahrenheit(celsius):
    return (celsius * 9/5) + 32

def fahrenheit_ke_celsius(fahrenheit):
    return (fahrenheit - 32) * 5/9

def main():
    suhu = float(input("Masukkan suhu dalam Celsius: "))
    print(f"{suhu} °C = {celsius_ke_fahrenheit(suhu)} °F")
    
    suhu = float(input("Masukkan suhu dalam Fahrenheit: "))
    print(f"{suhu} °F = {fahrenheit_ke_celsius(suhu)} °C")

if __name__ == "__main__":
    main()
