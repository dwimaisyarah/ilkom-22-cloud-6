input_angka = input("Masukkan angka romawi: ")

def roman_to_int(numeral):
        final_answer = 0
        if "CM" in numeral:
            final_answer += 900
            numeral = numeral.replace("CM", "")
        if "CD" in numeral:
            final_answer += 400
            numeral = numeral.replace("CD", "")
        if "XC" in numeral:
            final_answer += 90
            numeral = numeral.replace("XC", "")
        if "XL" in numeral:
            final_answer += 40
            numeral = numeral.replace("XL", "")
        if "IX" in numeral:
            final_answer += 9
            numeral = numeral.replace("IX", "")
        if "IV" in numeral:
            final_answer += 4
            numeral = numeral.replace("IV", "")
            
        for i in numeral:
            if i == "M":
                final_answer += 1000
            elif i == "D":
                final_answer += 500
            elif i == "C":
                final_answer += 100
            elif i == "L":
                final_answer += 50
            elif i == "X":
                final_answer += 10
            elif i == "V":
                final_answer += 5
            elif i == "I":
                final_answer += 1
        return final_answer
while True:
    if not all(karakter in "IVXLCDM" for karakter in input_angka):
        print("Input tidak valid")
        input_angka = input("Masukkan angka romawi yang valid:")
        continue
    if input_angka == "":
        print("Input tidak boleh kosong.")
        input_angka = input("Masukkan angka romawi:")
        continue
    if len(input_angka)>15:
        print("input terlalu panjang")
        input_angka = input("Masukkan angka romawi yang lebih pendek:")
        continue
    if any(input_angka.count(karakter)>3 for karakter in "IVXLCDM"):
        print("Input tidak valid. Karakter I, V, X, L, C, D, M tidak boleh muncul lebih dari 3 kali berturut-turut.")
        input_angka = input("Masukkan angka romawi yang valid:")
        continue