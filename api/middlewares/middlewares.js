const logQuote = (coin) => (req,res,next) =>{
    if(coin==="nickel" || coin==="penny" || coin==="quarter" || coin==="dime"){
      console.log(`A ${coin} saved is a ${coin} not enjoyed`)
      next()
    }else{
      res.json("Invalid coin")
    }  
  }
  
  const checkWord = (req,res,next)=>{
    if(req.query.word && req.query.word === "turd"){
      res.json(`${req.query.word} is bad, you can't proceed`)
    }else{
      next()
    }
  }