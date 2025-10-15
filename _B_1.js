router.post('/signup', async (req, res) => {
    console.log('Request for signup');
    const { username, email, password } = req.body;
    console.log('Request received with:', req.body); // Debug log
  
    try {
      // Check if email is already in use
      const existingUserByEmail = await User.findOne({ email });
      if (existingUserByEmail) {
        console.log('User already exists with email:', email);
        return res.status(400).json({ message: 'User already exists with this email' });
      }
      
      // Check if username is already in use
      const existingUserByUsername = await User.findOne({ username });
      if (existingUserByUsername) {
        console.log('User already exists with username:', username);
        return res.status(400).json({ message: 'User already exists with this username' });
      }
  
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();
  
      console.log('User registered:', username);
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      console.error('Error during signup:', err);
      res.status(500).json({ message: 'Something went wrong' });
    }
  });
  