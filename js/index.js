// Add an event listener to submit button of the form that pulls the value from the text box
// Then fetches the API using the value of the text box

document.addEventListener('DOMContentLoaded', () => {
  const githubForm = document.querySelector('#github-form')
  const userSearchInput = document.querySelector('#search')
  const userList = document.querySelector('#user-list')
  const reposList = document.querySelector('#repos-list')
  const searchURL = 'https://api.github.com/search/users?q='
  const userURL = 'https://api.github.com/users'
  // Add an event listener to git hub form then fetch the searched user by username
  githubForm.addEventListener('submit', (e) => {
    e.preventDefault()
    userList.innerHTML = '' // when we submit a new search, this clears out our list so that we can add the new users that we just searched for
    fetch(`${searchURL}${userSearchInput.value}`) // finding the specific user
      .then(resp => resp.json())
      .then(userArr => { // this fetch returns an array of users, so we will call the parameter 'userArr' so it's easier to remember
        console.log(userArr)
        userArr.items.forEach(user => { // here, we iterate through the array of users
          const searchedUser = document.createElement('li') // create a list item to store each user's info
          const userName = document.createElement('h3')
          const userAvatar = document.createElement('img')
          userName.innerHTML = `<a href=${user.html_url} target='blank'>${user.login}</a>` // add a link to the user's profile and attach it to the text that says their name
          userAvatar.src = user.avatar_url
          userAvatar.height = 150
          userAvatar.width = 150

          // here we add a click event listener to the user's picture, that will bring up a list of their repo's
          userAvatar.addEventListener('click', (e) => {
            e.preventDefault()
            reposList.innerHTML = '' // set the list back to empty every time we click a new picture so we can fill the list with only the repos of the user we clicked
            fetch(`${userURL}/${user.login}/repos`) // fetching the user's repos
              .then(resp => resp.json())
              .then(arrayOfRepos => {
                console.log(arrayOfRepos)
                arrayOfRepos.forEach(repo => { // iterate across the array to pull the name of each repo and attached its designated link (see line 38)
                  const repoListItem = document.createElement('li')
                  repoListItem.innerHTML = `<a href=${repo.html_url} target='blank'>${repo.html_url.slice(19)}</a>` // same thing as line 23, but with the repos
                  reposList.append(repoListItem) // here we add the list of repos to the other <ul> in our program, but only when a pciture is clicked. Otherwise the list is hidden
                })
              })
          })
          searchedUser.append(userName)
          searchedUser.append(userAvatar)
          userList.append(searchedUser) // now that we have our list of users, their pictures, and the pictures' event listeners... we append everything to our first <ul>
        })
      })
  })
})
