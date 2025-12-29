def main():
    winrate = float(input("Enter winrate (%): ")) / 100
    lp = int(input("Enter LP to gain: "))
    lp_per_win = int(input("Enter LP per won/lost per game: "))

    delta = div_round_up(lp, lp_per_win)  # round up

    wins, losses = calculate_required_wins(winrate, delta)
    print(f"Required wins: {wins}, Expected losses: {losses}")

"""returns ceil(numerator / denominator)"""
def div_round_up(numerator, denominator):
    return (numerator + denominator - 1) // denominator

def calculate_required_wins(winrate, delta):
    wins = winrate * delta / (2 * winrate - 1)
    losses = wins * (1 - winrate) / winrate
    return int(wins), int(losses)

if __name__ == "__main__":
    main()