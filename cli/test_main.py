from main import calculate_required_wins

def test_positive_delta():
    """Test with positive delta (gaining LP)"""
    winrate = 0.6
    delta = 16.0
    wins, losses = calculate_required_wins(winrate, delta)
    assert wins == 48
    assert losses == 32


def test_negative_delta():
    """Test with negative delta (losing LP)"""
    winrate = 0.4
    delta = -10.0
    wins, losses = calculate_required_wins(winrate, delta)
    assert wins == 20
    assert losses == 30
