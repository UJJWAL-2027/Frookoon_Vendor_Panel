import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Image,
    TextInput,
    Switch,
    Dimensions,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

const { width } = Dimensions.get('window');

type VendorEditProductNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'VendorEditProduct'
>;

type VendorEditProductRouteProp = RouteProp<RootStackParamList, 'VendorEditProduct'>;

interface Props {
    navigation: VendorEditProductNavigationProp;
    route: VendorEditProductRouteProp;
}

const VendorEditProductScreen: React.FC<Props> = ({ navigation, route }) => {
    const { productId } = route.params;

    const [productName, setProductName] = useState('Dry Fruits');
    const [category, setCategory] = useState('Dry Fruits');
    const [description, setDescription] = useState('Premium quality mixed dry fruits');
    const [price, setPrice] = useState('730');
    const [stock, setStock] = useState('25');
    const [stockStatus, setStockStatus] = useState('in_stock');
    const [isPublished, setIsPublished] = useState(true);

    const renderStockStatusChip = (label: string, value: string, icon: string, color: string, bgColor: string) => {
        const isActive = stockStatus === value;
        return (
            <TouchableOpacity
                style={[
                    styles.statusChip,
                    { backgroundColor: isActive ? bgColor : '#fff', borderColor: isActive ? color : '#ddd' }
                ]}
                onPress={() => setStockStatus(value)}
            >
                <Feather name={icon} size={14} color={isActive ? color : '#888'} style={{ marginRight: 4 }} />
                <Text style={[styles.statusChipText, { color: isActive ? color : '#888' }]}>{label}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.root}>
            <View style={styles.topHeader}>
                {/* FROOKOON LOGO */}
                <Image
                    source={{ uri: 'https://res.cloudinary.com/ddirrlngo/image/upload/v1772698012/logo_ws8i3j.png' }}
                    style={styles.logo}
                />
                
                {/* EDIT PRODUCT LINE */}
                <View style={styles.headerRow}>
                    <View style={styles.headerLeft}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <Feather name="arrow-left" size={24} color="#000" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Edit Product</Text>
                    </View>
                    <TouchableOpacity onPress={() => console.log('Save Pressed')}>
                        <Text style={styles.headerSaveText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* PRODUCT CARD CONTAINER */}
                <View style={styles.productCard}>
                    {/* PRODUCT IMAGE ROW */}
                    <View style={styles.imageRow}>
                        <View style={styles.imagePlaceholder}>
                            <Image
                                source={{ uri: 'https://res.cloudinary.com/ddirrlngo/image/upload/v1772698012/logo_ws8i3j.png' }}
                                style={styles.thumbnail}
                            />
                        </View>
                        <View style={styles.imageDetails}>
                            <Text style={styles.productTitle}>Dry Fruits</Text>
                            <TouchableOpacity style={styles.editImageButton}>
                                <Feather name="camera" size={14} color="#F57C00" style={{ marginRight: 6 }} />
                                <Text style={styles.editImageText}>Edit Image</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    {/* FORM FIELDS */}
                    <View style={styles.formContainer}>
                        {/* Product Name */}
                        <View style={styles.inputGroup}>
                            <View style={styles.labelRow}>
                                <Feather name="user" size={16} color="#F57C00" style={{ marginRight: 8 }} />
                                <Text style={styles.inputLabel}>Product Name</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    value={productName}
                                    onChangeText={setProductName}
                                    placeholder="Enter Product"
                                    style={styles.input}
                                />
                            </View>
                        </View>

                        {/* Category */}
                        <View style={styles.inputGroup}>
                            <View style={styles.labelRow}>
                                <Feather name="grid" size={16} color="#F57C00" style={{ marginRight: 8 }} />
                                <Text style={styles.inputLabel}>Category</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    value={category}
                                    onChangeText={setCategory}
                                    placeholder="Enter Category"
                                    style={styles.input}
                                />
                            </View>
                        </View>

                        {/* Product Description */}
                        <View style={styles.inputGroup}>
                            <View style={styles.labelRow}>
                                <Feather name="file-text" size={16} color="#F57C00" style={{ marginRight: 8 }} />
                                <Text style={styles.inputLabel}>Product Description</Text>
                            </View>
                            <View style={[styles.inputWrapper, { height: 48 }]}>
                                <TextInput
                                    value={description}
                                    onChangeText={setDescription}
                                    placeholder="Enter Product Description"
                                    style={styles.input}
                                />
                            </View>
                        </View>

                        {/* PRICE & STOCK ROW */}
                        <View style={styles.row}>
                            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                                <Text style={styles.inputLabel}>Price</Text>
                                <View style={styles.inputWrapper}>
                                    <View style={styles.prefixContainer}>
                                        <Text style={styles.currencyPrefix}>₹</Text>
                                    </View>
                                    <TextInput
                                        value={price}
                                        onChangeText={setPrice}
                                        keyboardType="numeric"
                                        style={styles.input}
                                    />
                                    <Text style={styles.unitSuffix}>/ kg</Text>
                                </View>
                            </View>

                            <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                                <Text style={styles.inputLabel}>Stock Quantity</Text>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        value={stock}
                                        onChangeText={setStock}
                                        keyboardType="numeric"
                                        style={styles.input}
                                    />
                                    <Text style={styles.unitSuffix}>kg</Text>
                                </View>
                            </View>
                        </View>

                        {/* STOCK STATUS */}
                        <View style={[styles.inputGroup]}>
                            <Text style={styles.inputLabel}>Stock Status</Text>
                            <View style={styles.chipsRow}>
                                {renderStockStatusChip('In Stock', 'in_stock', 'check-circle', '#498E45', '#E8F5E9')}
                                {renderStockStatusChip('Low stock', 'low_stock', 'alert-triangle', '#F57C00', '#FFF3E0')}
                                {renderStockStatusChip('Out of stock', 'out_stock', 'x-circle', '#D32F2F', '#FFEBEE')}
                            </View>
                        </View>

                        {/* PUBLISHED TOGGLE */}
                        <View style={styles.toggleRow}>
                            <View style={styles.labelRow}>
                                <Feather name="check-circle" size={16} color="#498E45" style={{ marginRight: 8 }} />
                                <Text style={styles.inputLabel}>Published</Text>
                            </View>
                            <Switch
                                value={isPublished}
                                onValueChange={setIsPublished}
                                trackColor={{ false: '#ddd', true: '#FFB74D' }}
                                thumbColor={isPublished ? '#F57C00' : '#fff'}
                            />
                        </View>
                    </View>
                </View>

                {/* ACTION BUTTONS (BELOW CARD) */}
                <View style={styles.actionButtonsRow}>
                    <TouchableOpacity 
                        style={[styles.bottomButton, styles.cancelButton]}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.bottomButton, styles.saveButton]}
                        onPress={() => console.log('Save Pressed')}
                    >
                        <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* BOTTOM NAVIGATION BAR */}
            <View style={styles.bottomTabNav}>
                <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('VendorDashboard')}>
                    <Text style={{ fontSize: 20 }}>🏠</Text>
                    <Text style={styles.tabText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('VendorProductList')}>
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
        backgroundColor: '#F8F9FA',
    },
    topHeader: {
        backgroundColor: '#fff',
        paddingTop: 10,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    logo: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        marginLeft: 16,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        height: 50,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        marginRight: 10,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
    },
    headerSaveText: {
        color: '#F57C00',
        fontWeight: 'bold',
        fontSize: 20,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 100,
    },
    productCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    imageRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    imagePlaceholder: {
        width: 80,
        height: 80,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#333',
        padding: 4,
    },
    thumbnail: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    imageDetails: {
        marginLeft: 16,
        flex: 1,
    },
    productTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    editImageButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF3E0',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        alignSelf: 'flex-start',
    },
    editImageText: {
        color: '#F57C00',
        fontSize: 12,
        fontWeight: 'bold',
    },
    divider: {
        height: 1,
        backgroundColor: '#F0F0F0',
        marginBottom: 16,
    },
    formContainer: {
        gap: 12,
    },
    inputGroup: {
        marginBottom: 8,
    },
    labelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    inputWrapper: {
        backgroundColor: '#F7F7F7',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        height: 40,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: '#000',
        paddingVertical: 8,
    },
    prefixContainer: {
        marginRight: 6,
    },
    currencyPrefix: {
        fontSize: 14,
        color: '#000',
    },
    unitSuffix: {
        fontSize: 14,
        color: '#888',
        marginLeft: 4,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    chipsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 4,
    },
    statusChip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 6,
        borderWidth: 1,
        flex: 1,
        marginHorizontal: 4,
        justifyContent: 'center',
    },
    statusChipText: {
        fontSize: 10,
        fontWeight: 'bold',
    },
    toggleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 12,
    },
    actionButtonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        gap: 12,
    },
    bottomButton: {
        flex: 1,
        height: 40,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    saveButton: {
        backgroundColor: '#F5A623',
    },
    cancelButtonText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    bottomTabNav: {
        backgroundColor: '#F1F1F1',
        borderTopWidth: 2,
        borderColor: '#999',
        height: 65,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: 5,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    tabItem: {
        alignItems: 'center',
    },
    tabText: {
        fontSize: 10,
        fontWeight: '600',
        color: '#000',
        marginTop: 4,
    },
});

export default VendorEditProductScreen;
