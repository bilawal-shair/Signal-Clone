import React, { useEffect, useLayoutEffect, useState } from "react"
import { SafeAreaView, Text, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { Avatar } from "react-native-elements"

import { auth, db } from "../firebase"
import CustomListItem from "../components/CustomListItem"
import { AntDesign, EvilIcons } from '@expo/vector-icons';


const HomeScreen = ({ navigation }) => {


    const [chats, setChats] = useState([])


    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace('Login')
        })

    }

    useEffect(()=>{

        const unsubscribe = db.collection("chats").onSnapshot(snapshot =>(
            setChats(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        ))

        return unsubscribe;

    },[])


    useLayoutEffect(() => {

        navigation.setOptions({
            title: "Signal",
            headerStyle: { backgroundColor: "#fff" },
            headerTitleStyle: { color: "black" },
            headerTintColor: "black",
            headerLeft: () => (
                <View style={{ marginLeft: 10 }}>

                    <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>

                        <Avatar rounded source ={{ uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANYAAAB6CAMAAAD0412JAAABCFBMVEX/wgD/////6b5lbnjl5ebk5OWJW0Lm5ufj4+T4+Pj7+/v09PTs7O3p6erx8fL63aPcw5P/xgD/vgBgaXSFV0PIys3W19mGhoJTXWmgoKH/8cX/ygBtam7k6PFqbHKEVDx8TkZ/UkXYpST/xCB6RS7/1nxaaXzoz5//+/H/0GPfqCB3SkfyuRP/7svNmSqNX0Gkczqxfzb/35v9xTq7mnrv2bD/zFH51YeXZz72yWn06tnmtCmDh4rr38z/8trz4b69jTKac1fBponIqoSwjWnYwZ/00ZLWtoeujFzby6+Fe2LXtWivk1N3dnGbiWGhm5DHoEK8mkq2rZpLYoHWrDmBe2y5ubevq6NsASOzAAATKUlEQVR4nK1cCVvbOBN2EhnfNrFDoUDCEQihDXdDuFqglG63X7vs9qD//598kkY+JEuynVbP7s4CdjRvRno1MxrJaLVanmmZbqvl2pbl4B+x8LCwLDPEIrCQj4WPUIBFiAV+NDQtIhzTQkTgR/GLLhbwIoIXLfzi+OrtbTTb3T8zSBue7V/OooN3Vybq/9Gu4EXLghcty/gtWEjoCxX66vft29Pd/WFMmpE38uPwfPfjwfiPdaWAZSOAhRCFheAVZNNXkElfMU36iolSQb9CBH0hm/aFbHiRKDmO9s+GPCC+YctFiMH6va7wixQWFha8gQzP80LcPJBE+FQ4+S/D0jPCG2Ho84++a59rABUMd7535Ti/1ZVcGKZJvykLviLfhm/KNi1qRtMiX5FtEjO6+FFizQDeSIVt+8KLB5dndUABsrPL2/78XZEZZNotYk3TpiPOpGY0uAmOx3U2PGHSWTBdyaRz8fAmIqAzAQtUGADpi5Y5rY8pRdYez9OVCTpaFoWFBYFlApdga5nMWsVx3cBa3It+dK7B1O1217oyYOeR12/alWAtRK2FiQGs5bquFwSB47oOFl4mXCxC/JNPhRsGgc+EkwkHXkzf9/vTcw2i7vDV4d3JRIbLMM7brtukK9CRvZEL9mIgJXhUZF1GTwjJ6Ilj3bdKS3WNyeFJ7/Xm5sW1HBWx2Dvfqt0VpkBOR35lENYtRvAMFuJgmdK+iqw7GypBbR8fbfUWFnoXCltRXMOZ2a/ZVQZLJHi24CHDcVzP930X82zgY3M7LhYe/hH/MsxFiCV+BD8a4jfgJ/oiFviZwDs4U5iqaxwe9TAm3HqAqps28dGz2zpd4b/RHrGqoFwqQoqDPmrYNhC8bQPB23RFs21EKcOGeWxTy+NHHXiU0W3OuuOPKlDd7YstALXQu+sahDMm16+2cbueGCK0+BSZVV0RHQNOR0oZWFDKsOcgeDNnXWLybACML5WmOllgoBYWjiZra6/ujo8vjhZ62H5HFxfHhxOeGuNL6ixquqpJ8IJblc+6FuCRLSaosJjgN8J35ZWqO5mQ/746ykAtLBxvH29ubvXy3/R6W6+PDrn5Fhu3nqYryVePABYCfjCBGAwYxb6XCYeJkI5tifCyn9gbbYmVJifkv4cFDBTGQqn1No/uJty7UajuyguLQqmjz1xdu7ary5bCAj2dlgdgd9LbxvPoTgJDRNUTURnxx76qK2wUuatriq5u9bqFZItJGgRZzkyG6uho0u3ebVaC2jreLjse8cyXdcXWLZuLt0zJpEvXLQumkAVTyIJoAZMIGdc+4xIQIRYuFbQvK+hLUBnG8dZJHVv1LrYNqTM1k3QFOgagY1DUMeM7Fm/hRw2E1P6Wk/qECBw1GACco7YrQbV2stU7WbvbqkR1PJlMhrIFLN61yl1lOgoePAKCRzU8eLMmwUvmFaa/zYXeyXYlKty2ehfHJ3fbE8k4tH6P4BGbdXprWWAtk/sKzb4MlTE8xqPv6KgGKmIxuoKdvBKBxTO1tTL2AoIHayGwlsk8eC7yFMLRMP+bl4n8GWcqQ9U9rGMnAdzr41cirrYiOi5qJQ2kaXTMEbwJBG8WCd60eTOmwm29k/u2F9W0LrPanWj0tyjviowYs0jwMIUszowB2K+C4JGO4PFiMpai6m5X0npdXGbK8xKCl3nwYmBiBTzBBx5wKCN4IkKR4H1nX+oHdo/nMRZhxTXhk+L9tCtQLsgJvsDzITB7WFyEcBgZiJGl34IAkw+bC9Ezi0UjOarJfLaSRWJx1BejXz56ZjparqijmxG8MNYYwSMZwVPLH8h9duwGzgNrUx5f3vZT50ito5bg04SaIkVjlZbjMykqwzhRwNpgTW6sY3EEQjtDNVI0QPBmSntA8IQOIQNZEJQxNSJ05EPQMCYlHsRINhaO7j+8ef/w8P7Nh3uKUHhma1ueDIgjoo6n1JEXuY4OEHyaOgSCB/JEJkfwaUgK39RbRd6ie90TMB19ePOwd7uatYP29PHhwz2PbEtctdI2fJd7BkDwZpHgEZcXTQkeP1q9tYDEfD8Rl4ohyK/FGzsfHqft9mqbb6urGNqHnZ0asOLdih0Tfk9C6sGjlBkED54jT0q3Cr7AXm7Bwd04eiAIFG21/f4os9jWoTLPdtDPPHiHChY2Fwk+5/nMgy8lb9IcDkk2gqDxclH0lVnOtXzV2ngzVWICYNOHdChih1/1iefQccgESYhmoqAjpyqeWykTis5EkeCZq4uYq9ufqnQw1nJT7WkxQZvep7iUsIx2TvAml7K0kcbVFWCZHCwb8fEW8+D31bBeM1j3FaZK2wfA9Xqi+sR4f6yAZcpgpQTvQ17Dz9MbTjEDWcjdpCmc8FaJyugyWBs1UaX22lRxBpldBeXkOjql/BIwoXw3kk9W51uE6k2R7mSTzauaqPAEA864U4/C8740We1o3HG5B6/d0PXH6q0eEhiTtjOtiQrjosOwd6JJzl/VJXhx7zjbyYPl2NQtx/KkDA9roQGsv3ao96SBNZMux05Jx+JyDOQJzJ4Kp0yeOcFfqbzB+WC1pwBL/aHG2VWmVYHgy8yer0VuzoTM1dUyIfmK2rrtxuvGgxBgLVwoqRC3qSXNt+iYEEFWp/66JUuhZbBSynioSxnt1cdKWPEu78dJCd5K1y0zI/jSFlG6qRRQ8nSyHS8coo013yp2TdN1q7axgDIWdBt6xjDIttrIjhfVigrYzQqcVGSq1vQJ3cwnfKvdxs/WrdrmAoLXD8L4IPMJA+oTloN+Mavb0IPvq3x3aGuZS1h3dj2Am3Gh+9R4dy4PXoy3NATf1/CgUXB1dx5qGgvSpDqCx+1MEW/JE2qE4KWFOeWcYyquVPveDFYamNSFBYShXY5xG17ptSoJsTioqtxEFeyz1n3FYB3VG4Sr72EManxC2iJu4DQpDpKl7ctbC9Kse6GxXMbGYz1jpdZ6rUdlzJpmnoJA2CJiQTAJSfErAQ1JAxCYS3SrFjUXTaht/F173aIe/Nah2tOl7TLNcrqgo1vQkeVuA8jdBhYrDir8BWvv4r8EXguKg1qQc2xlOccrZVwMLT6f3TdbjQnBb9zr+RV78eMAvtogsJgAHTFQtwU6EuFjUSoOQtIcfLFip4Ix4v0owoxdKzJOcZHleC+a6WENr1B1FY1fqKJpSbbE+R2ToiN2qx+D5xFuGwv3tY1FnaeNv/BbenvFt4jfMUm3xHmC56o/tXtHOauSktAKWJcE1v1O/THYJq7uxh5+S1kxxWBVrTz8H7PdSJmr69iI3420VDVArM0IrDc7j01gtXfuyVuRHlZEldPkMgRXV1schASC14WQpO0S/f5qEpbgUbjzgbx1qoc1K371NfaOdaVcDhZcKVe/gt/3iYKLG01QYVgP5K1d7Qdjr7BZKVerxRN8Cwi+BQTfohtf5ENAyLfqsjY8pZOr0RhksNRJOtrO+wFs2xUIPtWxxXTMVW1a/al3dI2YcsanZrAW9irHIHZ2+3U2WRXl/VZVQq0CFp7apDUahG1C71HVBw/7tao/M4LPM4gOn0Es5UWJqOrdGDaHVWMIEmvJspzKvChmQkueapMyYSUs42weWHq+oB9LlZPVE+LJAkxIRxxi9YSNPPh+xQyg9vrYDBZGpaudL8BqVt4vEDxPnizeSgm+2loY1/5pE1inlzW+q/hcTfAQb9msvJ/FW8XsfAhTLIRxm4l83LoVBM90OGtgr0hVkc23/X6mnFOa+NkUC2FuseKgWlsLlOCrwi2Ga7c+rLqfKDJhxUEn2bqlzjxVOE9pO6sPq86wJs5Tf569Y6TLE/p5cVBFKiPTovYo/Puz8ngG/4FBce/YgepPV139qUrRsOnIp2hQRWCSafG/mqhWl0edOrjig5akWI7qKJwImuf8llUPVvdLp2bi6TbpjL7WwBXfNib4OsVBzFpmRdDPUP0zSp7qWesp6XSSji7/Dm141VLW6hatlSXUlPWessgzrErR0PZlhFWtZa6/O6SN/qn8yPOxLh6WnI1sqcr7kay836tKEWFb/TvCqiZPNdz41eUEcP1XYa54ly1CYi7DNBW5jEqC5/eOKzJEZOduRHVdqd7rX/17pQNtcF0B63Suc8d0eKani9jwNKWni6JKWJ9HVNNkudpazFjYXJ/06c84YtGvY1IdXQRBMMpCex9UZaG9rSgYN9PpKO5GKsqOc1T/jpiqybcqVE8pqk7nu257i5Qjy3TkUjRZPaEuRaMu76/wCoafR5muFRnraY6qM/qi3wjqNy/v1+wd2+W94wof7jrXNbnRG2uxU2g/tea65GDV3TvWxZniwS5lzR1ta19yY3X0i9ceByv5oTFX/FZyTKtQFVSO8Kt3I8UgRzu51r4mRV01w3BvkYM1+k/3seNsN9Jku5E2txspUEad6k/xdKF2FHa/c7q+Vy7KGBUPS7MkkyThPHvH+JUWTDeAxb/CnXFGmmJCogEP63FPgYug4gfhV83kauewkHAsjVW7lzz4rLzf90n9Dd3GcuDEueOBcLCgdRlYOO5Y4z91rwVY0aJ0T4ii4mB1EjWssys/CB04V5Afhw+xOrQgIwhSUS7v11fRFMv7daFk94cICwMoGWy6uFiGNVIXSs76SFdFozugWwcWDFL3SgNLsNb7KFoUcU33GKrHUfFZtbXisd8cFgzCVuGMSS687PYDv3DGRF2ALM6t5FtEcRVGYgZqcfFbEZZ6bsXnLekZEy8TgeSMSSvbdMh8Qs7fKhF8oC4XxwTPw1qOGC6MbDqd7uWY8C++1mTCW9JxU5+wKcFjMVan1fh1qzOKclxi2+OnltJ72jel5f01PHgzPTiuPXecHwaWHAtPYX3iJgzmDCWub9wXMFBG/tM+fyFSSvBQq6s4C2rUrQrihGp2ddf+43mAjsIo4kYfa8tFWEpjxeehPhZWFAfVOugknDvuqw5vXf8z6PBtMWJNABU9csZKPivyGWnKac7qT+mWuOLUAv4iZB5U9/rz95GAKjUXZ7K9vb0o4idhJ/n+SQrskjuWVn9LHIplWgGcHvTZIUIrCLDwLEKexd1XB57xytFkN/7SEUHls6vU3peeHX39rxwik/gxreRJq2QKxTKkBCg7RGg59GIgWl5jwIpmslkJqy7L6iLI6qYs4wPL0Hqjvpje7f4Qvv7UCh0pqkfZo6NP4gn/OCI9Mspgx1JRXgTqCj5hydVtRPBUcFFyd/JlJEXFD8OsLQ6kT49+8lFXfCa5geEPV3/yx6n7txyqn5Lxl+J6KqHak6PCuJJ/iwOR8IXytJ1TiLfK1Z/c+XY1Y3oljs2HIXZwFWqCrqK9yvMqb98LTB9HQO7lpGw5YVu+Gq5Bsrp424Of+hp5skllLx6XsA6LX0KWCo33610soa3+bHru2PVZ+N/dLptqwCubDHI+3FvmHxdhdUb/MlzDsZsz+7zVn0EeYLr0/HheV5MSPFSwuPAGZl04zjqRkYWAqzP6xkA98U8P1iXGBT9q+C7vijvjzs5nktWHwAoCJFZ/upqr4fzKq+Ecetzkk3QIiuqOlkmtzLcb4SsQ4dNHfxLaiKd+8Wq4wp1wvGh8NZys+lO42GwWd3/I2WKwzhROklQ+PXbS/8/AS1DB9IpP+4jrKiV4ffWnxRG87kIkMYvN/DEYpLPuZwVfDNapwZKbzEBJNv5eDnjoQkt+TuJTsStbXv0peFW1ioO0N0RBycNsRapZhmvwIngp2DN59pfIW+sKVNhcP3a9UldZJrasqqQ4KNs7ZuUmJl/KgYrlJvwaCJHpk3rJwnony7ZfgrXkv1jRoeok3/qyrsRA3dSUm/zezUH40V86e63fKGDhAahEtfIr9ZH+wNVwgrcYgA8cFGBZ0vvaSmpzwBTWWl+XMHv692dVV9Kr4azUT+dKuZRzS3k1nJjdby11lMAGBJZglgEMQhWozrMXajcSyvO/vC/yu1fD0a/oRaLCRefW+oDOI/IPbuvrOljJiu0hdVeNrob73cudA1tcZjlYZI6xf6nQwEpuvJqXO2vWLTnBB4rqT78k8pERPK/Io0iYW9hGBBCmiUHGhFJTPTtuZVfKClWfq/7kKCNLtdHTNghOBJnCXRWSeRwuSQ2mIXjJw50XpWsxFJThliiDcedc1Z8a1g3ClxLmaAAr6bys2VWT6k/FcmxVLcf5/dihdVMaibVhJSs3L1q1u5KUctl8vJVfvuOwW3dUouqCIcfz8EgU8mT1YCUJBtWkK51yXqk4yCwyIZ/LkFwNV/Y/A2eJt1gtWNhSz37Drua/Gq7xndWUdZ0XgwKwGrCSlcEzCrw5utJdDVcRRmqv/RbuWINrvzGwl4MsyqqAhTG9tEkmc66uNDeM07jahaAfon1V0O+IQX8WkLv0DTiHSV+0n29WqM20sJKVlZslG69Ev9MVzeqKQf/8V8Np8yZYLbR0Q6hABYuY8+Z57JIc+m91pSoOmjehVn19qvvi+eYJw8IY8tA/SVaWrBc3v56X7ND/Y13lCTXV3Z/K9GeDbbA0X+l62NtZev718mZ5maAaLC+//PVsjT3iAf3RrgTxf+cm6EcWyolnAAAAAElFTkSuQmCC" }} />

                    </TouchableOpacity>

                </View>
            ),

            headerRight: () => (
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 80,
                    marginRight: 20
                }}>

                    <TouchableOpacity activeOpacity={0.5}>

                        <AntDesign name="camera" size={24} color="black" />

                    </TouchableOpacity>

                    <TouchableOpacity 

                    onPress={()=> navigation.navigate("Addchat")}
                    
                    activeOpacity={0.5}>

                    <EvilIcons name="pencil" size={24} color="black" />

                    </TouchableOpacity>


                </View>
            )

        });

    }, [navigation])

    const enterChat = (id, chatName) =>{
        navigation.navigate('Chat', {
             id,
             chatName,

        })
    }
    return (
        <SafeAreaView>
            <ScrollView style = {styles.container}>

                {chats.map(({ id, data: {chatName}}) =>(
                    <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat}/>

                ))}

            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        height: "100%",
    }
})