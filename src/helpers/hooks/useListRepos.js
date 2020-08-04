import React, {useEffect, useState} from "react";
import {getListRepos} from "../function/get_Repository.js"
export {useListRepos}

function useListRepos () {
    const [listRepos, setlistRepos] = useState(null);
    
    useEffect(() => {
        async function buildWall () {
            let url = 'http://localhost:8080/getImageFromUnsplash';
            const data = await (await fetch(url)).json();
            const blobik = await (await fetch(data.urls.raw + '?q=85&w=1920&fit=crop')).blob();
            const newImage = URL.createObjectURL(blobik)
            setWall(data);
            setImage(newImage)
        
        }
        buildWall();
    }, [])
    return [wall,image]
  }

  const useFetch = () => {
    const [value, setValue] = useState("");
  
    useEffect(async () => {
      const response = await fetch("https://httpbin.org/get?foo=bar");
      const data = await response.json();
      setValue(data.args.foo);
    }, []);
  
    return value;
  };