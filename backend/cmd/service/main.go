package main
import "fmt"
import "github.com/olegsmetanin/gobazel/publicapi"
// import proto "github.com/golang/protobuf/proto"

func main() {

	test := publicapi.User{
		Value: 1234,
	}
	fmt.Printf("%+v\n", test)
}