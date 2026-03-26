import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

const { width } = Dimensions.get('window');

type VendorProfileNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'VendorProfile'
>;

interface Props {
    navigation: VendorProfileNavigationProp;
}

const VendorProfileScreen: React.FC<Props> = ({ navigation }) => {
    const renderQuickAction = (icon: string, label: string) => (
        <TouchableOpacity style={styles.quickActionCard}>
            <View style={styles.quickActionIconContainer}>
                <Feather name={icon} size={22} color="#F57C00" />
            </View>
            <Text style={styles.quickActionLabel}>{label}</Text>
        </TouchableOpacity>
    );

    const renderMenuItem = (icon: string, label: string, isLogout?: boolean) => (
        <TouchableOpacity style={styles.menuItemCard}>
            <View style={styles.menuItemLeft}>
                <Feather name={icon} size={22} color="#F57C00" />
                <Text style={[styles.menuItemLabel, isLogout && { color: '#F57C00' }]}>{label}</Text>
            </View>
            <View style={styles.menuItemRight}>
                <Feather name="chevron-right" size={20} color="#000" />
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.root}>
            {/* 1. HEADER SECTION */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()}>
                    <Feather name="chevron-left" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Profile</Text>
                <TouchableOpacity style={styles.headerButton}>
                    <Feather name="shopping-bag" size={20} color="#F57C00" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* 2. USER PROFILE SECTION */}
                <View style={styles.profileSection}>
                    <View style={styles.avatarWrapper}>
                        <Image
                            source={{ uri: 'https://res.cloudinary.com/ddirrlngo/image/upload/v1772698012/logo_ws8i3j.png' }} // Using avatar placeholder
                            style={styles.avatar}
                        />
                    </View>
                    <Text style={styles.userName}>Amit Patel</Text>
                    <Text style={styles.userEmail}>amitpatel@gmail.com</Text>
                </View>

                {/* 3. QUICK ACTION CARDS */}
                <View style={styles.quickActionsRow}>
                    {renderQuickAction('bell', 'Notification')}
                    {renderQuickAction('home', 'Bank Details')}
                    {renderQuickAction('rotate-ccw', 'History')}
                </View>

                {/* 4. MENU LIST SECTION */}
                <View style={styles.menuSection}>
                    {renderMenuItem('user', 'Edit Profile')}
                    {renderMenuItem('map-pin', 'Address Management')}
                    {renderMenuItem('help-circle', 'Help & Support')}
                    {renderMenuItem('log-out', 'Log Out', true)}
                </View>
            </ScrollView>

            {/* 5. BOTTOM NAVIGATION BAR */}
            <View style={styles.bottomTabNav}>
                <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('VendorDashboard')}>
                    <Text style={{ fontSize: 20 }}>🏠</Text>
                    <Text style={styles.tabText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem}>
                    <Text style={{ fontSize: 20 }}>📁</Text>
                    <Text style={styles.tabText}>Categories</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('VendorProductList')}>
                    <Text style={{ fontSize: 20 }}>📦</Text>
                    <Text style={styles.tabText}>Products</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.tabItem}
                    onPress={() => navigation.navigate('VendorOrders')}
                >
                    <Text style={{ fontSize: 20 }}>📜</Text>
                    <Text style={styles.tabText}>Orders</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem}>
                    <Text style={{ fontSize: 20 }}>👤</Text>
                    <Text style={[styles.tabText, { color: '#ff7a00' }]}>Profile</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 10,
    },
    headerButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 100,
    },
    profileSection: {
        alignItems: 'center',
        marginBottom: 30,
    },
    avatarWrapper: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        marginBottom: 16,
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
    },
    userName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#F57C00',
    },
    userEmail: {
        fontSize: 14,
        color: '#333',
        marginTop: 4,
        fontWeight: '500',
    },
    quickActionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    quickActionCard: {
        width: (width - 60) / 3,
        height: 85,
        backgroundColor: '#fff',
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    quickActionIconContainer: {
        marginBottom: 8,
    },
    quickActionLabel: {
        fontSize: 10,
        color: '#333',
        fontWeight: 'bold',
    },
    menuSection: {
        gap: 16,
    },
    menuItemCard: {
        height: 65,
        backgroundColor: '#fff',
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#000',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuItemLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginLeft: 20,
    },
    menuItemRight: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        elevation: 2,
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
        fontWeight: '500',
        color: '#000',
        marginTop: 2,
    },

});

export default VendorProfileScreen;
