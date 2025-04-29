onmessage = (e) => {
    console.log("worker.js:"+e.data[0]+" "+e.data[1]+" "+e.data[2])
  };