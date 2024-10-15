import random

# Define the notes we'll use
NOTES = ['C', 'D', 'E', 'F', 'G', 'A', 'B']

def display_note():
    """Randomly select and display a note."""
    note = random.choice(NOTES)
    print(f"Play this note: {note}")
    return note

def check_note(correct_note, played_note):
    """Check if the played note matches the correct note."""
    if correct_note.lower() == played_note.lower():
        print("Correct! Well done!")
    else:
        print(f"Oops! The correct note was {correct_note}. Let's try again.")

def main():
    print("Welcome to the Piano Score Teacher!")
    print("This program will display a note, and you should play it on your piano.")
    print("Then, enter the note you played.")
    
    while True:
        correct_note = display_note()
        played_note = input("Enter the note you played (or 'q' to quit): ")
        
        if played_note.lower() == 'q':
            break
        
        check_note(correct_note, played_note)
        print()  # Add a blank line for readability

    print("Thank you for practicing! Keep up the good work!")

if __name__ == "__main__":
    main()