import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from '../trip/trip.style'
import { icons } from '../../../../constants'
import { useRouter } from 'expo-router'
const ActiveTabCard = ({activeTabs}) => {
    const router = useRouter()

    return (
        <View>
        {activeTabs.map((item,index) => (
        <View
        key={item}
            style={styles.tabContainer}
            
        >
           

            <View style={styles.textContainer}>
                <Text style={styles.tripName} numberOfLines={1}  >{item}</Text>
               
            </View>
            <TouchableOpacity style={styles.logoContainer}
             onPress={() => {
               router.push(`/trips`)
            }}
            >
                <Image
                    source={icons.chevronRight}
                    resizeMode='contain'
                    style={styles.arrowImage}
                   
                />
            </TouchableOpacity>
        </View>
        ))
        }
        </View>

    )
}

export default ActiveTabCard