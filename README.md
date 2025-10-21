# TaskCLI

TaskCLI is a simple command-line task manager to help you manage your daily tasks.

## Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/taskcli.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd taskcli
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```

## Usage

You can use TaskCLI to add, list, complete, and delete your tasks.

### Commands

*   `taskcli add [task]`: Add a new task.
*   `taskcli list`: List all tasks.
*   `taskcli delete [id]`: Delete a task.
*   `taskcli update [id] [description]`: Update a task's description.
*   `taskcli mark-in-progress [id]`: Mark a task as "in-progress".
*   `taskcli mark-done [id]`: Mark a task as "done".
*   `taskcli help`: Show the help message.

### Examples

*   To add a new task:
    ```bash
    taskcli add "Buy groceries"
    ```
*   To list all tasks:
    ```bash
    taskcli list
    ```
*   To mark a task as complete:
    ```bash
    taskcli mark-done 1
    ```
*   To delete a task:
    ```bash
    taskcli delete 1
    ```
