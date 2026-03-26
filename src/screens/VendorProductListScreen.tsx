import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList,
    Dimensions,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

const { width } = Dimensions.get('window');

type VendorProductListNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'VendorProductList'
>;

interface Props {
    navigation: VendorProductListNavigationProp;
}

const PRODUCT_DATA = [
    { id: '1', name: 'Mixed Dry Fruits', category: 'Dry Fruits', stock: 50, price: '30 Rs.', status: 'Active' },
    { id: '2', name: 'Mixed Dry Fruits', category: 'Dry Fruits', stock: 50, price: '30 Rs.', status: 'Active' },
    { id: '3', name: 'Mixed Dry Fruits', category: 'Dry Fruits', stock: 50, price: '30 Rs.', status: 'Active' },
    { id: '4', name: 'Mixed Dry Fruits', category: 'Dry Fruits', stock: 50, price: '30 Rs.', status: 'Active' },
];

const VendorProductListScreen: React.FC<Props> = ({ navigation }) => {
    const renderProductItem = ({ item }: { item: typeof PRODUCT_DATA[0] }) => (
        <View style={styles.productCard}>
            {/* LEFT IMAGE */}
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: 'https://res.cloudinary.com/ddirrlngo/image/upload/v1772698012/logo_ws8i3j.png' }}
                    style={styles.productImage}
                />
            </View>

            {/* CENTER DETAILS */}
            <View style={styles.detailsContainer}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.categoryText}>{item.category}</Text>
                <Text style={styles.stockText}>Stock:{item.stock}</Text>
                <View style={styles.priceTag}>
                    <Text style={styles.priceText}>{item.price}</Text>
                </View>
            </View>

            {/* RIGHT ACTIONS */}
            <View style={styles.actionsContainer}>
                <TouchableOpacity 
                    style={styles.editButton}
                    onPress={() => navigation.navigate('VendorEditProduct', { productId: item.id })}
                >
                    <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>

                <View style={styles.statusBadge}>
                    <Text style={styles.statusBadgeText}>{item.status}</Text>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.root}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.mainContainer}>
                    {/* TOP HEADER CONTAINER */}
                    <View style={styles.headerCard}>
                        {/* LOGO */}
                        <Image
                            source={{ uri: 'https://res.cloudinary.com/ddirrlngo/image/upload/v1772698012/logo_ws8i3j.png' }}
                            style={styles.headerLogo}
                        />

                        {/* HEADER ROW */}
                        <View style={styles.headerRow}>
                            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                                <Feather name="arrow-left" size={22} color="#000" />
                            </TouchableOpacity>
                            <Text style={styles.headerTitle}>Product List</Text>
                        </View>

                        {/* SEARCH + ADD PRODUCT ROW */}
                        <View style={styles.searchAddRow}>
                            <View style={styles.searchBar}>
                                <Feather name="search" size={18} color="#888" style={{ marginRight: 6 }} />
                                <TextInput
                                    placeholder="Search products..."
                                    placeholderTextColor="#888"
                                    style={styles.searchInput}
                                />
                            </View>
                            <TouchableOpacity 
                                style={styles.addProductButton}
                                onPress={() => navigation.navigate('VendorAddProduct')}
                            >
                                <Text style={styles.addProductText}>Add Product</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* PRODUCT LIST */}
                    <FlatList
                        data={PRODUCT_DATA}
                        renderItem={renderProductItem}
                        keyExtractor={(item) => item.id}
                        scrollEnabled={false}
                        contentContainerStyle={{ paddingBottom: 20 }}
                    />
                </View>
            </ScrollView>

            {/* BOTTOM TAB NAVIGATION */}
            <View style={styles.bottomTabNav}>
                <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('VendorDashboard')}>
                    <Text style={{ fontSize: 20 }}>🏠</Text>
                    <Text style={styles.tabText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem}>
                    <Text style={{ fontSize: 20 }}>📦</Text>
                    <Text style={[styles.tabText, { color: '#ff7a00' }]}>Products</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem}>
                    <Text style={{ fontSize: 20 }}>📁</Text>
                    <Text style={styles.tabText}>Categories</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.tabItem}
                    onPress={() => navigation.navigate('VendorOrders')}
                >
                    <Text style={{ fontSize: 20 }}>📜</Text>
                    <Text style={styles.tabText}>Orders</Text>
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
    headerCard: {
        backgroundColor: '#f5f5f5',
        borderRadius: 16,
        padding: 16,
        marginTop: 10,
        marginBottom: 10,
    },
    headerLogo: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        marginRight: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },
    searchAddRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    searchBar: {
        width: '60%',
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: '#000',
        padding: 0,
    },
    addProductButton: {
        backgroundColor: '#ff7a00',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 10,
    },
    addProductText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 14,
    },
    productCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#d6d6d6',
        padding: 12,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageContainer: {
        width: 70,
        height: 70,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        marginRight: 12,
        overflow: 'hidden',
    },
    productImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    detailsContainer: {
        flex: 1,
    },
    productName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    categoryText: {
        fontSize: 13,
        color: '#666',
        marginTop: 2,
    },
    stockText: {
        fontSize: 13,
        color: '#666',
        marginTop: 2,
    },
    priceTag: {
        backgroundColor: '#ff9b3d',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        marginTop: 6,
        alignSelf: 'flex-start',
    },
    priceText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
    },
    actionsContainer: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: 70,
    },
    editButton: {
        backgroundColor: '#e6e6e6',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
    },
    editButtonText: {
        color: '#000',
        fontSize: 12,
        fontWeight: '500',
    },
    statusBadge: {
        backgroundColor: '#2e8b57',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
    },
    statusBadgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
    },
    bottomTabNav: {
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#ddd',
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

export default VendorProductListScreen;
