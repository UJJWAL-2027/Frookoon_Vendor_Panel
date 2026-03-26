import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Note: Temporarily removed external icons/charts to ensure 500 error is resolved
// We can re-add them once the base screen is stable.

import { RootStackParamList } from '../../App';


type VendorDashboardNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'VendorDashboard'
>;

interface Props {
    navigation: VendorDashboardNavigationProp;
}

const { width } = Dimensions.get('window');

const VendorDashboardScreen: React.FC<Props> = ({ navigation }) => {
    const [chartTab, setChartTab] = useState<'Weekly' | 'Monthly'>('Weekly');

    return (
        <SafeAreaView style={styles.root}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* Header Section */}
                <View style={styles.headerCard}>
                    <Text style={styles.headerTitle}>Hello , AMIT PATEL 👋</Text>
                    <Text style={styles.headerSubtitle}>Here's your today's report</Text>
                </View>

                {/* Dashboard Stats Grid */}
                <View style={styles.statsGrid}>
                    {/* Card 1 */}
                    <View style={styles.statCard}>
                        <View style={[styles.statIconContainer, { backgroundColor: '#fff3e0' }]}>
                            <Text style={{ fontSize: 20 }}>🛍️</Text>
                        </View>
                        <Text style={styles.statTitle}>Total Orders</Text>
                        <Text style={styles.statNumber}>120</Text>
                        <Text style={styles.statSubGreen}>+12% this week</Text>
                    </View>

                    {/* Card 2 */}
                    <View style={styles.statCard}>
                        <View style={[styles.statIconContainer, { backgroundColor: '#e8f5e9' }]}>
                            <Text style={{ fontSize: 20, color: '#2e7d32', fontWeight: 'bold' }}>₹</Text>
                        </View>
                        <Text style={styles.statTitle}>Total Earnings</Text>
                        <Text style={styles.statNumber}>₹ 45,000</Text>
                        <Text style={styles.statSubGreen}>+8% this week</Text>
                    </View>

                    {/* Card 3 */}
                    <View style={styles.statCard}>
                        <View style={[styles.statIconContainer, { backgroundColor: '#fff8e1' }]}>
                            <Text style={{ fontSize: 20 }}>⏳</Text>
                        </View>
                        <Text style={styles.statTitle}>Pending Orders</Text>
                        <Text style={styles.statNumber}>8</Text>
                        <View style={[styles.badgeContainer, { backgroundColor: '#f5d28b' }]}>
                            <Text style={styles.badgeText}>Processing</Text>
                        </View>
                    </View>

                    {/* Card 4 */}
                    <View style={styles.statCard}>
                        <View style={[styles.statIconContainer, { backgroundColor: '#ffebee' }]}>
                            <Text style={{ fontSize: 20 }}>📉</Text>
                        </View>
                        <Text style={styles.statTitle}>Low Stock</Text>
                        <Text style={styles.statNumber}>3 Items</Text>
                        <View style={[styles.badgeContainer, { backgroundColor: '#ffd5d5' }]}>
                            <Text style={[styles.badgeText, { color: '#b31212' }]}>Restock Soon</Text>
                        </View>
                    </View>
                </View>

                {/* Sales Overview Placeholder Section */}
                <View style={styles.chartCard}>
                    <View style={styles.chartHeaderRow}>
                        <Text style={styles.sectionTitle}>Sales Overview</Text>
                        <View style={styles.tabContainer}>
                            <TouchableOpacity
                                style={[styles.tabButton, chartTab === 'Weekly' && styles.tabButtonActive]}
                                onPress={() => setChartTab('Weekly')}
                                activeOpacity={0.8}
                            >
                                <Text style={[styles.tabText, chartTab === 'Weekly' && styles.tabTextActive]}>Weekly</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.tabButton, chartTab === 'Monthly' && styles.tabButtonActive]}
                                onPress={() => setChartTab('Monthly')}
                                activeOpacity={0.8}
                            >
                                <Text style={[styles.tabText, chartTab === 'Monthly' && styles.tabTextActive]}>Monthly</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Temporary Chart Visual Placeholder */}
                    <View style={styles.chartPlaceholder}>
                        <View style={styles.barContainer}>
                            <View style={[styles.bar, { height: '40%' }]} />
                            <View style={[styles.bar, { height: '70%', backgroundColor: '#ff7a00' }]} />
                            <View style={[styles.bar, { height: '55%' }]} />
                            <View style={[styles.bar, { height: '90%', backgroundColor: '#ff7a00' }]} />
                            <View style={[styles.bar, { height: '60%' }]} />
                            <View style={[styles.bar, { height: '80%', backgroundColor: '#ff7a00' }]} />
                            <View style={[styles.bar, { height: '50%' }]} />
                        </View>
                        <View style={styles.chartLabels}>
                            <Text style={styles.chartLabelText}>M</Text>
                            <Text style={styles.chartLabelText}>T</Text>
                            <Text style={styles.chartLabelText}>W</Text>
                            <Text style={styles.chartLabelText}>T</Text>
                            <Text style={styles.chartLabelText}>F</Text>
                            <Text style={styles.chartLabelText}>S</Text>
                            <Text style={styles.chartLabelText}>S</Text>
                        </View>
                    </View>
                </View>

                {/* Recent Orders Section */}
                <View style={styles.recentOrdersContainer}>
                    <Text style={styles.sectionTitle}>Recent Orders</Text>

                    {/* Order 1 */}
                    <TouchableOpacity
                        style={styles.orderCard}
                        onPress={() => navigation.navigate('VendorOrderDetail', { orderId: '1234' })}
                    >
                        <Image
                            source={{ uri: 'https://res.cloudinary.com/ddirrlngo/image/upload/v1772698012/logo_ws8i3j.png' }}
                            style={styles.orderImage}
                        />
                        <View style={styles.orderMiddle}>
                            <View style={styles.placeholderLine1} />
                            <View style={styles.placeholderLine2} />
                        </View>
                        <View style={[styles.orderStatusBadge, { backgroundColor: '#c9f2d0' }]}>
                            <Text style={[styles.orderStatusText, { color: 'green' }]}>Delivered</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Order 2 */}
                    <TouchableOpacity
                        style={styles.orderCard}
                        onPress={() => navigation.navigate('VendorOrderDetail', { orderId: '5678' })}
                    >
                        <Image
                            source={{ uri: 'https://res.cloudinary.com/ddirrlngo/image/upload/v1772698012/logo_ws8i3j.png' }}
                            style={styles.orderImage}
                        />
                        <View style={styles.orderMiddle}>
                            <View style={styles.placeholderLine1} />
                            <View style={styles.placeholderLine2} />
                        </View>
                        <View style={[styles.orderStatusBadge, { backgroundColor: '#ffe0b3' }]}>
                            <Text style={[styles.orderStatusText, { color: '#d97706' }]}>Pending</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Bottom Navigation */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem}>
                    <Text style={{ fontSize: 20 }}>🏠</Text>
                    <Text style={[styles.navText, { color: '#ff7a00' }]}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Text style={{ fontSize: 20 }}>📁</Text>
                    <Text style={styles.navText}>Categories</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate('VendorOrders')}
                >
                    <Text style={{ fontSize: 20 }}>📜</Text>
                    <Text style={styles.navText}>Orders</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.navItem} // Changed from tabItem to navItem for consistency with existing styles
                    onPress={() => navigation.navigate('VendorProductList')}
                >
                    <Text style={{ fontSize: 20 }}>📦</Text>
                    <Text style={styles.navText}>Products</Text> {/* Changed from tabText to navText for consistency */}
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('VendorProfile')}>
                    <Text style={{ fontSize: 20 }}>👤</Text>
                    <Text style={styles.navText}>Profile</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#f3f3f3',
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    headerCard: {
        backgroundColor: '#e6d5a8',
        borderRadius: 12,
        padding: 18,
        marginTop: 12,
        marginBottom: 16,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000',
    },
    headerSubtitle: {
        fontSize: 13,
        color: '#333333',
        marginTop: 4,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    statCard: {
        width: '48%',
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 14,
        marginBottom: 14,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    statIconContainer: {
        width: 38,
        height: 38,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    statTitle: {
        fontSize: 12,
        color: '#555555',
        marginBottom: 4,
    },
    statNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 4,
    },
    statSubGreen: {
        fontSize: 11,
        color: '#2e7d32',
        fontWeight: '500',
    },
    badgeContainer: {
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
        marginTop: 4,
    },
    badgeText: {
        fontSize: 10,
        fontWeight: '600',
        color: '#8a6414',
    },
    chartCard: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 14,
        marginBottom: 16,
        elevation: 3,
    },
    chartHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000000',
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#f3f3f3',
        borderRadius: 20,
        padding: 2,
    },
    tabButton: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 18,
    },
    tabButtonActive: {
        backgroundColor: '#333333',
    },
    tabText: {
        fontSize: 11,
        color: '#666666',
        fontWeight: '500',
    },
    tabTextActive: {
        color: '#ffffff',
    },
    chartPlaceholder: {
        height: 150,
        justifyContent: 'flex-end',
    },
    barContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: 120,
        paddingHorizontal: 10,
    },
    bar: {
        width: 12,
        backgroundColor: '#f0f0f0',
        borderRadius: 6,
    },
    chartLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginTop: 8,
    },
    chartLabelText: {
        fontSize: 10,
        color: '#999',
    },
    recentOrdersContainer: {
        marginBottom: 10,
    },
    orderCard: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 2,
    },
    orderImage: {
        width: 50,
        height: 50,
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
        marginRight: 10,
    },
    orderMiddle: {
        flex: 1,
        justifyContent: 'center',
    },
    placeholderLine1: {
        width: '70%',
        height: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        marginBottom: 6,
    },
    placeholderLine2: {
        width: '40%',
        height: 8,
        backgroundColor: '#f0f0f0',
        borderRadius: 4,
    },
    orderStatusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    orderStatusText: {
        fontSize: 11,
        fontWeight: 'bold',
    },
    bottomNav: {
        height: 60,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#eeeeee',
        paddingBottom: Platform.OS === 'ios' ? 10 : 0,
    },
    navItem: {
        alignItems: 'center',
    },
    navText: {
        fontSize: 10,
        marginTop: 2,
        fontWeight: '500',
        color: '#000',
    },
});

export default VendorDashboardScreen;
