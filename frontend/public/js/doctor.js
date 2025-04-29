// const apiBase = 'http://localhost:5000/api/doctors'; // Your backend URL for doctors

// async function loginDoctor(event) {
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

// async function registerDoctor(event) {
//   event.preventDefault();
//   const formData = {
//     name: document.getElementById('name').value,
//     email: document.getElementById('email').value,
//     password: document.getElementById('password').value,
//     phone: document.getElementById('phone').value,
//     address: document.getElementById('address').value,
//     gender: document.getElementById('gender').value,
//     specialization: document.getElementById('specialization').value,
//     degrees: document.getElementById('degrees').value.split(','), // comma separated
//     collegeName: document.getElementById('collegeName').value,
//     experienceYears: document.getElementById('experienceYears').value,
//     bio: document.getElementById('bio').value,
//     availableTimes: document.getElementById('availableTimes').value.split(','), // comma separated
//     awards: document.getElementById('awards').value.split(','), // optional
//     memberships: document.getElementById('memberships').value.split(','), // optional
//     languagesSpoken: document.getElementById('languagesSpoken').value.split(',') // optional
//   };

//   try {
//     const response = await fetch(`${apiBase}/register`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(formData),
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




const apiBase = 'http://localhost:5000/api/doctors'; // Your backend URL for doctors

async function loginDoctor(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch(`${apiBase}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',  // ✅ Include cookies (for JWT)
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      alert('Login successful!');
      console.log(data); // Token is stored in the cookie now
      window.location.href = '/'; // Optionally, redirect to home page
    } else {
      alert(data.message || 'Login failed');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

async function registerDoctor(event) {
  event.preventDefault();
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
    phone: document.getElementById('phone').value,
    address: document.getElementById('address').value,
    gender: document.getElementById('gender').value,
    specialization: document.getElementById('specialization').value,
    degrees: document.getElementById('degrees').value.split(','), // comma separated
    collegeName: document.getElementById('collegeName').value,
    experienceYears: document.getElementById('experienceYears').value,
    bio: document.getElementById('bio').value,
    availableTimes: document.getElementById('availableTimes').value.split(','), // comma separated
    awards: document.getElementById('awards').value.split(','), // optional
    memberships: document.getElementById('memberships').value.split(','), // optional
    languagesSpoken: document.getElementById('languagesSpoken').value.split(','), // optional
    role: "Doctor"
  };

  try {
    const response = await fetch(`${apiBase}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (response.ok) {
      alert('Registration successful!');
      console.log(data);
      window.location.href = '/login-doctor';  // Redirect to login page after registration
    }  else {
      alert(data.message || 'Registration failed');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
