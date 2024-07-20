import {view, Text, View, StyleSheet} from "react-native"
import React from "react"
import { ListItem, Avatar } from "react-native-elements";

const CustomListItem = ({id, chatName, enterChat}) =>{
    return(
        <ListItem 

        onPress={()=>enterChat(id,chatName)}
        
        
        key={id} bottomDivider>
         <Avatar

          rounded
          source={{
            uri:   "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAYFBMVEUiLTqzusC3vsQVIjEXJDK6wcceKjcbJzUgKzkOHS0QHy6vtrwAFygKGysuOEQAFSekq7JpcXmXnqVMVF58g4tweIBCS1WEi5IoMz9iaXJUXGWPlp05Qk1aYmszPUl3focRZD18AAAD90lEQVR4nO1a25aqMAwFegOKUO4ooP//l6c4juOMIyTYMOeB/aLLl71N0jRN4nk7duzYsWPHjh073kDoeVJeP/4AkjPOpZem9htnSm7NnnljWxg/sPBN0Y5ewrczhIy63IiJ+oZJRpF30UZmiNOL/iL/EqHrlG1AL+Nai5/sHxD6SG8E5hUv6K8SCsVp+Q8n/8n43xyhy5iSP8rn+ScFI6ECNs6Y/1NBcCLzAm+W+ScJZ0XDL88awm+9kNKcBVYs+P+uoCcJA5YD+a2CI0UYMA0XoAlMwCowv1VwcZ+UGZzeQkeu+TkgBTxAjK6jQEGPwM0HvWMfyDPKA9YHjnOBOqE8YH1Quk2HcYUVcHF7EjNcCNggKBKnApTB8fu+cRqF0HvoAW6jMBzwAgaXZfoqAX9sAb9xKUD+uQVS9CnQZ6epkOOPoUt6z0vQicgcnAqIMOXIVUDrVgA/Yu+C3O19HA5YCzg9hROQUeg4BpE16RQCrqtSBXuWfcJ1PWJxgD8LLLTbMzCB1Zh3QU3wNFKI60BT9A7jC/xpVjl/l1iEHfgkmo6kZxhDs6E4EnVpeA9ygvNX0R2yA8Wh7siahfwEMAFhk8pmo3wxDETtPgc9IKsXFIg6o+SfOkWzCkRN3a8O4+PrZmng56SN2g/EjXnVLTcNRQZ8goouz+MC+/fF5UDUIn0CS3v/hxWE35+3GFfcELKhug6Mrn99GhtVA9t2biUjVea9MVob0+YNizcem00I+SFLLLJow4HZjh3/FcJQ3RBufQokZ4yrbmjK8nQqy2bo1PWXTbhVnEVNXvU2EYo7rhP0vJRZRDvHt6knHVsTiCD4eR1Nv4jAtOOZbo7P+Tkv9BP1Dx26yAdOUBWGTI6FFpCiVOhilI6vJpl0FYj9rqFKE3eekEnTzxr+V1/0TebICvHQLs3Mf5Xgt4OLS1qpGtWaeJSgL97b4Xh4WYJCIHT53uBEqfYN+quENnwjQdoKfKX1vxCYZvVbgS0sjAAV+OPKcjlZfonCIPJVgRC96/4HBe0KLxxg7RAYgh77Zg8ZdlQ6D4Ft3QI6EUgFuL5FhB0PABTkCAWqcU0/AdG/Zu/nn2cEGlwqRW4D8BOiBbYveEnCbxVAG3gUDpgQmA7kgKVO3HqA1iqA/dh1gCwVoEeUGATVYjIIQzr6ScHiM5LDd+ZWCVgcJsVUR+AmwCyEIXI8iIdo5hNy3JIaADBSpfXA5INZetkQ8y+N1RemAS4wv1iQuCwEf8fsklmI31XBw8ykojX7SnjMBIEsN+APTq8zgRrJQ2B+65kftxAwM1hDLSmsFlC9vg4QKwJEAiiLkbuAmR0r0mroLmDmobqNBf5cwHcX/APC4jjN+Sv4GQAAAABJRU5ErkJggg=="
          }}
             
         />

         <ListItem.Content>
            
            <ListItem.Title style = {{fontWeight: 800}}>
                {chatName}
            </ListItem.Title>

            <ListItem.Subtitle numberOfLines={1} ellipsizeMode ="tail">

                This is a test subtitle

            </ListItem.Subtitle>


         </ListItem.Content>
        </ListItem>
    );
}
export default CustomListItem

const styles = StyleSheet.create({})