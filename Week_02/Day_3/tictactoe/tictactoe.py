def display_board(board):
    """Display the game board with decorative border"""
    print("\nTIC TAC TOE")
    print("*" * 18)
    print("*", " " * 14, "*")

    # Display the board rows
    for i in range(3):
        row = board[i]
        # Format each cell to be centered in a 3-character space
        cell_display = f"* {row[0]:^3}|{row[1]:^3}|{row[2]:^3} *"
        print(cell_display)

        # Add separator line between rows (but not after the last row)
        if i < 2:
            print("*", "---|---|---", "*")

    print("*", " " * 14, "*")
    print("*" * 18)


def player_input(player, board):
    """Get and validate player input for their move"""
    while True:
        try:
            row = input(f"Enter row: ")
            if row.strip() == "":
                continue
            row = int(row)

            col = input(f"Enter column: ")
            if col.strip() == "":
                continue
            col = int(col)

            # Validate row and column are in range (1-3)
            if row < 1 or row > 3:
                print("Row must be between 1 and 3. Try again.")
                continue
            if col < 1 or col > 3:
                print("Column must be between 1 and 3. Try again.")
                continue

            # Convert to 0-based index
            row -= 1
            col -= 1

            # Check if the cell is empty
            if board[row][col] != ' ':
                print("That position is already taken. Try again.")
                continue

            return row, col

        except ValueError:
            print("Please enter valid numbers.")
        except (KeyboardInterrupt, EOFError):
            print("\nGame ended by player.")
            exit()


def check_win(board, player):
    """Check if the current player has won"""
    # Check rows
    for row in board:
        if row[0] == row[1] == row[2] == player:
            return True

    # Check columns
    for col in range(3):
        if board[0][col] == board[1][col] == board[2][col] == player:
            return True

    # Check diagonals
    if board[0][0] == board[1][1] == board[2][2] == player:
        return True
    if board[0][2] == board[1][1] == board[2][0] == player:
        return True

    return False


def check_tie(board):
    """Check if the game has resulted in a tie"""
    for row in board:
        for cell in row:
            if cell == ' ':
                return False
    return True


def play():
    """Main game loop"""
    # Welcome message
    print("\nWelcome to TIC TAC TOE!")

    # Initialize the game board
    board = [[' ', ' ', ' '],
             [' ', ' ', ' '],
             [' ', ' ', ' ']]

    # Set starting player
    current_player = 'X'

    # Game loop
    while True:
        # Display the board
        display_board(board)

        # Show whose turn it is
        print(f"\nPlayer {current_player}'s turn...")

        # Get player input
        row, col = player_input(current_player, board)

        # Update the board
        board[row][col] = current_player

        # Check for a winner
        if check_win(board, current_player):
            display_board(board)
            print(f"\n🎉 Congratulations! Player {current_player} wins! 🎉")
            break

        # Check for a tie
        if check_tie(board):
            display_board(board)
            print("\n🤝 It's a tie! 🤝")
            break

        # Switch players
        current_player = 'O' if current_player == 'X' else 'X'

    print("\nThanks for playing!")


if __name__ == "__main__":
    play()
