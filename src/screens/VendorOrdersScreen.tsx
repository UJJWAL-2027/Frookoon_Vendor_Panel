import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    FlatList,
    Image,
    Dimensions,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

const { width } = Dimensions.get('window');

type VendorOrdersNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'VendorOrders'
>;

interface Props {
    navigation: VendorOrdersNavigationProp;
}

// Sample Order Data
const ORDERS_DATA = [
    { id: '1', name: 'Rajesh Gupta', status: 'New' },
    { id: '2', name: 'Anjali Sharma', status: 'New' },
    { id: '3', name: 'Amit Sharma', status: 'New' },
    { id: '4', name: 'Rohit kumar', status: 'New' },
];

const VendorOrdersScreen: React.FC<Props> = ({ navigation }) => {
    const renderOrderItem = ({ item }: { item: typeof ORDERS_DATA[0] }) => (
        <View style={styles.orderCard}>
            {/* LEFT SIDE (PRODUCT IMAGE) */}
            <View style={styles.productImageContainer}>
                <Image
                    source={{ uri: 'https://res.cloudinary.com/ddirrlngo/image/upload/v1772698012/logo_ws8i3j.png' }}
                    style={styles.productImage}
                />
            </View>

            {/* CENTER CONTENT */}
            <View style={styles.centerContent}>
                <Text style={styles.customerName}>{item.name}</Text>
                <View style={styles.placeholderLine1} />
                <View style={styles.placeholderLine2} />
                <View style={styles.bottomHighlight} />
            </View>

            {/* RIGHT SIDE */}
            <View style={styles.rightSide}>
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>New</Text>
                </View>
                <TouchableOpacity 
                    style={styles.viewDetailsButton}
                    onPress={() => navigation.navigate('VendorOrderDetail', { orderId: item.id })}
                >
                    <Text style={styles.viewDetailsText}>View Details</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.root}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.mainContainer}>
                    {/* HEADER CONTAINER */}
                    <View style={styles.headerContainer}>
                        <View style={styles.headerLeft}>
                            <Image
                                source={{ uri: 'https://res.cloudinary.com/ddirrlngo/image/upload/v1772698012/logo_ws8i3j.png' }}
                                style={styles.logoImage}
                            />
                            <Text style={styles.vendorName}>AMIT PATEL</Text>
                            <Text style={styles.headerSubtitle}>Order List</Text>
                        </View>
                        <TouchableOpacity style={styles.menuButton}>
                            <Feather name="menu" size={22} color="#000" />
                        </TouchableOpacity>
                    </View>

                    {/* DIVIDER LINE */}
                    <View style={styles.divider} />

                    {/* FILTER BUTTON ROW */}
                    <View style={styles.filterRow}>
                        <TouchableOpacity style={styles.leftFilterButton}>
                            <Text style={styles.leftButtonText}>New Orders</Text>
                            <Feather name="chevron-down" size={20} color="#000" style={{ marginLeft: 6 }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.rightFilterButton}>
                            <Text style={styles.rightButtonText}>Delivered</Text>
                        </TouchableOpacity>
                    </View>

                    {/* ORDER LIST */}
                    <FlatList
                        data={ORDERS_DATA}
                        renderItem={renderOrderItem}
                        keyExtractor={(item) => item.id}
                        scrollEnabled={false}
                        contentContainerStyle={styles.listContainer}
                    />
                </View>
            </ScrollView>

            {/* BOTTOM TAB NAVIGATION */}
            <View style={styles.bottomTabNav}>
                <TouchableOpacity 
                    style={styles.tabItem}
                    onPress={() => navigation.navigate('VendorDashboard')}
                >
                    <Text style={{ fontSize: 20 }}>🏠</Text>
                    <Text style={styles.tabText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem}>
                    <Text style={{ fontSize: 20 }}>📁</Text>
                    <Text style={styles.tabText}>Categories</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem}>
                    <Text style={{ fontSize: 20 }}>📜</Text>
                    <Text style={[styles.tabText, { color: '#ff7a00' }]}>Orders</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.tabItem}
                    onPress={() => navigation.navigate('VendorProductList')}
                >
                    <Text style={{ fontSize: 20 }}>📦</Text>
                    <Text style={styles.tabText}>Products</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('VendorProfile')}>
                    <Text style={{ fontSize: 20 }}>👤</Text>
                    <Text style={styles.tabText}>Profile</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    mainContainer: {
        paddingHorizontal: 16,
    },
    headerContainer: {
        backgroundColor: '#f5f5f5',
        borderRadius: 16,
        padding: 16,
        marginTop: 10,
        marginBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerLeft: {
        justifyContent: 'center',
    },
    logoImage: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        marginBottom: 6,
    },
    vendorName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#2f5d50',
    },
    menuButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    divider: {
        height: 1,
        backgroundColor: '#d6d6d6',
        marginVertical: 8,
    },
    filterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    leftFilterButton: {
        width: '48%',
        height: 42,
        borderRadius: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#cfcfcf',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    leftButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#000',
    },
    rightFilterButton: {
        width: '48%',
        height: 42,
        borderRadius: 10,
        backgroundColor: '#ff7a00',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rightButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#fff',
    },
    listContainer: {
        paddingBottom: 20,
    },
    orderCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#d4d4d4',
        padding: 10,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    productImageContainer: {
        width: 60,
        height: 60,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#ddd',
        marginRight: 10,
        overflow: 'hidden',
    },
    productImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    centerContent: {
        flex: 1,
    },
    customerName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000',
    },
    placeholderLine1: {
        height: 6,
        width: 140,
        backgroundColor: '#dcdcdc',
        borderRadius: 4,
        marginTop: 6,
    },
    placeholderLine2: {
        height: 6,
        width: 100,
        backgroundColor: '#dcdcdc',
        borderRadius: 4,
        marginTop: 4,
    },
    bottomHighlight: {
        height: 4,
        width: 80,
        backgroundColor: '#dcdcdc',
        borderRadius: 2,
        marginTop: 10,
    },
    rightSide: {
        alignItems: 'flex-end',
    },
    badge: {
        backgroundColor: '#ff9b3d',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
    },
    badgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    viewDetailsButton: {
        backgroundColor: '#ff7a00',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        marginTop: 16,
    },
    viewDetailsText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    bottomTabNav: {
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#ccc',
        height: 65,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: 5,
    },
    tabItem: {
        alignItems: 'center',
    },
    tabText: {
        fontSize: 10,
        fontWeight: '500',
        color: '#000',
        marginTop: 2,
    },
});

export default VendorOrdersScreen;
