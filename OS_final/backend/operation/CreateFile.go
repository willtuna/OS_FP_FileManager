package main

import "fmt"
import "os"

func main() {
	var filePath string = os.Args[1]

	var _, err = os.Stat(filePath)

	if filePath == "-h" || filePath == "--help" {
		fmt.Println("Usage: touch file")
		return
	}

	if os.IsNotExist(err){
		var file, err = os.Create(filePath)
		if err!=nil{
			fmt.Println(err)
			return
		}
		defer file.Close()
	}

}
