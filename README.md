# Live Demo
https://test-project-1-996b1.web.app/demo/

# Start the project locally
```
npm run start
```

# Test
Basic component level tests are included.
After `npm run test`, press key `a` to run all tests.
```
npm run test
>a
```

# Corner Cases
- In the case where a pokemon doesn't have backSprite available, it uses frontSprite image. 
- If both are unavailable, it will use the `no-image-placehollder.png` found in the `public` directory.
- Some moves (like healing) does not have damages. In such cases the power is default to 0, as the move cause no damage to the opponent.

# Build
```
npm run build
```

