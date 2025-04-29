// const apiBase = 'http://localhost:5000/api/users';  // Your backend URL for users

// async function loginUser(event) {
//   event.preventDefault();
//   const email = document.getElementById('email').value;
//   const password = document.getElementById('password').value;

//   try {
//     const response = await fetch(`${apiBase}/login`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password }),
//     });
//     const data = await response.json();
//     if (response.ok) {
//       alert('Login successful!');
//       console.log(data);
//     } else {
//       alert(data.message || 'Login failed');
//     }
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

// async function registerUser(event) {
//   event.preventDefault();
//   const name = document.getElementById('name').value;
//   const email = document.getElementById('email').value;
//   const password = document.getElementById('password').value;
//   const phone = document.getElementById('phone').value;
//   const address = document.getElementById('address').value;
//   const age = document.getElementById('age').value;
//   const gender = document.getElementById('gender').value;

//   try {
//     const response = await fetch(`${apiBase}/register`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ name, email, password, phone, address, age, gender }),
//     });
//     const data = await response.json();
//     if (response.ok) {
//       alert('Registration successful!');
//       console.log(data);
//     } else {
//       alert(data.message || 'Registration failed');
//     }
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }





// const apiBase = 'http://localhost:5000/api/users';  // Your backend URL for users

// async function loginUser(event) {
//   event.preventDefault();
//   const email = document.getElementById('email').value;
//   const password = document.getElementById('password').value;

//   try {
//     const response = await fetch(`${apiBase}/login`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       credentials: 'include',  // ✅ Include cookies (for JWT)
//       body: JSON.stringify({ email, password }),
//     });

//     const data = await response.json();
//     if (response.ok) {
//       alert('Login successful!');
//       console.log(data); // Token is stored in the cookie now
//       window.location.href = 'http://localhost:5000/api/users/'; // Optionally, redirect to home page
//     } else {
//       alert(data.message || 'Login failed');
//     }
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

async function registerUser(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const phone = document.getElementById('phone').value;
  const address = document.getElementById('address').value;
  const age = document.getElementById('age').value;
  const gender = document.getElementById('gender').value;
  const role = "Patient"
  try {
    const response = await fetch(`${apiBase}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, phone, address, age, gender, role}),
    });
    const data = await response.json();
    if (response.ok) {
      alert('Registration successful!');
      console.log(data);
      window.location.href = '/login-user';  // Redirect to login page after registration
    } else {
      alert(data.message || 'Registration failed');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}


const apiBase = 'http://localhost:5000/api/users';  // Your backend URL for users

async function loginUser(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch(`${apiBase}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',  // ✅ VERY IMPORTANT for cookies
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      alert('Login successful!');
      console.log(data);
      window.location.href = '/';   // ✅ Redirect to home page after successful login
    } else {
      alert(data.message || 'Login failed');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
