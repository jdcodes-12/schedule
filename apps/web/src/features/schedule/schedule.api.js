const apiBaseURL = 'http://localhost:3030/api'

export const getLessons = async () => (
  await fetch(`${apiBaseURL}/schedule`)
  .then((response) => {
    if (!response.ok)
      throw new Error('Could not fetch lesson data.');

    return response.json();
  })
  .then((data) => data)
  .catch((error) => {
    if (error.name === 'TypeError')
      console.error('CORS error: ', error);
    
    else console.error('Unexpected Error: ', error);
  })
)