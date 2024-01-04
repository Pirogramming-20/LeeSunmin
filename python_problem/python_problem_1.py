from itertools import cycle

def validate_input():
    flag = True
    while flag:
        input_num = input("부를 숫자의 개수를 입력하세요(1, 2, 3만 입력 가능) : ")

        # 정수 확인
        if not input_num.isdigit():
            print("정수를 입력하세요")
            continue

        # 범위 확인
        if int(input_num) not in [1, 2, 3]:
            print("1,2,3 중 하나를 입력하세요")
        else:  # 최종 okay
            flag = False
    return int(input_num)


def round_result(num, input_num, player):
    for i in range(input_num):
        num += 1
        print(f"{player} : ", num)
    return num


if __name__ == "__main__":
    num = 0
    player_list = ["playerA", "playerB"]
    player_cycle = cycle(player_list)
    while num < 31:
        player = next(player_cycle)
        input_num = validate_input()
        num = round_result(num, input_num, player)
