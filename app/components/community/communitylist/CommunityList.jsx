import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'

import styles from './communitylist.style'
import { COLORS } from '../../../constants'
import CommunityCard from '../../common/cards/community/CommunityCard'
import useFetch from '../../../hooks/useFetch'

const CommunityList = () => {
    const router = useRouter()
    const { data, isLoading, error } = useFetch('communities')
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Communities</Text>
                <TouchableOpacity>
                    <Text style={styles.headerBtn}>Show all</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.cardsContainer}>
                {isLoading ? (
                    <ActivityIndicator size="large" colors={COLORS.primary} />
                ) : error ? (
                    <Text>Something went wrong</Text>
                ) : (
                    data?.map((community) => (
                        <CommunityCard
                            community={community}
                            key={`nearby-community-${community?._id}`}
                            handleNavigate={() => router.push(`/community/${community?._id}`)}
                        />
                    ))
                )}
            </View>
        </View>
    )
}

export default CommunityList