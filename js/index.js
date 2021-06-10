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
    userList.innerHTML = ''
    fetch(`${searchURL}${userSearchInput.value}`)
      .then(resp => resp.json())
      .then(userObj => {
        console.log(userObj)
        userObj.items.forEach(user => {
          const searchedUser = document.createElement('li')
          const userName = document.createElement('h3')
          const userAvatar = document.createElement('img')
          userName.innerHTML = `<a href=${user.html_url} target='blank'>${user.login}</a>`
          userAvatar.src = user.avatar_url
          userAvatar.height = 150
          userAvatar.width = 150

          userAvatar.addEventListener('click', (e) => {
            e.preventDefault()
            reposList.innerHTML = ''
            fetch(`${userURL}/${user.login}/repos`)
              .then(resp => resp.json())
              .then(arrayOfRepos => {
                console.log(arrayOfRepos)
                arrayOfRepos.forEach(repo => {
                  const repoListItem = document.createElement('li')
                  repoListItem.innerHTML = `<a href=${repo.html_url} target='blank'>${repo.html_url.slice(19)}</a>`
                  reposList.append(repoListItem)
                })
              })
          })
          searchedUser.append(userName)
          searchedUser.append(userAvatar)
          userList.append(searchedUser)
        })
      })
  })
})
