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