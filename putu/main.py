input_angka = input("Masukkan angka romawi: ")

def roman_to_int(numeral):
        final_answer = 0
        if "CM" in numeral:
            final_answer += 900
            numeral = numeral.replace("CM", "")