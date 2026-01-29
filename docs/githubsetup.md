# GitHub Setup Instructions

This guide explains how to upload the Goniaa Fashion project to a new GitHub repository.

1.  **Create a new repository on GitHub.** You can do this from the GitHub website.

2.  **Initialize a Git repository in your local project folder:**
    ```bash
    cd goniaa-fashion
    git init
    git branch -m main
    ```

3.  **Add all the project files to the repository:**
    ```bash
    git add .
    ```

4.  **Commit the files:**
    ```bash
    git commit -m "Initial commit: Goniaa Fashion complete source code"
    ```

5.  **Link your local repository to the one you created on GitHub:**
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
    ```
    (Replace `YOUR_USERNAME` and `YOUR_REPOSITORY` with your actual GitHub username and repository name.)

6.  **Push the code to GitHub:**
    ```bash
    git push -u origin main
    ```
