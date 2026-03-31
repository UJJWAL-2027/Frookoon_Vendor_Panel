import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert,
    Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
    VendorSplashScreen: undefined;
    VendorRegisterScreen: undefined;
    VendorLogin: undefined;
    VendorDashboard: undefined;
};

type VendorRegisterScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'VendorRegisterScreen'
>;

interface Props {
    navigation: VendorRegisterScreenNavigationProp;
}

const SAMPLE_OTP = '123456';

const VendorRegisterScreen: React.FC<Props> = ({ navigation }) => {

    // ✅ ALL hooks declared unconditionally at the top — fixes "Rendered more hooks" error
    const [mobileNumber, setMobileNumber] = useState('');
    const [ownerName, setOwnerName] = useState('');
    const [shopName, setShopName] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [resendTimer, setResendTimer] = useState(0);

    const otpAnim = useRef(new Animated.Value(0)).current;

    // Individual refs instead of useRef([]) to avoid hook count issues
    const otp0 = useRef<TextInput>(null);
    const otp1 = useRef<TextInput>(null);
    const otp2 = useRef<TextInput>(null);
    const otp3 = useRef<TextInput>(null);
    const otp4 = useRef<TextInput>(null);
    const otp5 = useRef<TextInput>(null);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const otpRefs = [otp0, otp1, otp2, otp3, otp4, otp5];

    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    const startResendTimer = () => {
        setResendTimer(30);
        timerRef.current = setInterval(() => {
            setResendTimer(prev => {
                if (prev <= 1) {
                    if (timerRef.current) clearInterval(timerRef.current);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const navigateToLogin = () => {
        navigation.navigate('VendorLogin');
    };

    const handleSendOTP = () => {
        if (!mobileNumber || mobileNumber.length < 10) {
            setErrors(prev => ({ ...prev, mobile: 'Enter a valid 10-digit mobile number' }));
            return;
        }
        setErrors(prev => ({ ...prev, mobile: '' }));

        Alert.alert(
            '🔔 OTP Notification',
            `Your Frookoon verification OTP is:\n\n${SAMPLE_OTP}\n\n(Sample OTP for testing)`,
            [{ text: 'OK', onPress: () => otp0.current?.focus() }]
        );

        setOtpSent(true);
        setOtp(['', '', '', '', '', '']);

        if (timerRef.current) clearInterval(timerRef.current);
        startResendTimer();

        otpAnim.setValue(0);
        Animated.timing(otpAnim, {
            toValue: 1,
            duration: 350,
            useNativeDriver: true,
        }).start();
    };

    const handleOtpChange = (text: string, index: number) => {
        const cleaned = text.replace(/[^0-9]/g, '');
        const newOtp = [...otp];
        newOtp[index] = cleaned;
        setOtp(newOtp);
        setErrors(prev => ({ ...prev, otp: '' }));
        if (cleaned && index < 5) {
            otpRefs[index + 1].current?.focus();
        }
    };

    const handleOtpKeyPress = (key: string, index: number) => {
        if (key === 'Backspace' && !otp[index] && index > 0) {
            otpRefs[index - 1].current?.focus();
        }
    };

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!mobileNumber || mobileNumber.length < 10)
            newErrors.mobile = 'Enter a valid 10-digit mobile number';
        if (!otpSent) {
            newErrors.otp = 'Please send OTP first';
        } else if (otp.join('').length < 6) {
            newErrors.otp = 'Enter the 6-digit OTP';
        } else if (otp.join('') !== SAMPLE_OTP) {
            newErrors.otp = `Invalid OTP. Use the sample OTP: ${SAMPLE_OTP}`;
        }
        if (!ownerName.trim()) newErrors.ownerName = 'Owner name is required';
        if (!shopName.trim()) newErrors.shopName = 'Shop name is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCreateAccount = () => {
        if (!validate()) return;
        console.log('Create Account:', { mobileNumber, ownerName, shopName });
        navigation.reset({ index: 0, routes: [{ name: 'VendorDashboard' }] });
    };

    const otpTranslateY = otpAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [-15, 0],
    });

    return (
        <SafeAreaView style={styles.root}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1, width: '100%' }}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.cardContainer}>

                        {/* Logo */}
                        <Image
                            source={{ uri: 'https://res.cloudinary.com/ddirrlngo/image/upload/v1772698012/logo_ws8i3j.png' }}
                            style={styles.logo}
                        />

                        {/* Title */}
                        <Text style={styles.titleContainer}>
                            <Text style={styles.titleOrange}>VENDOR </Text>
                            <Text style={styles.titleGreen}>REGISTRATION</Text>
                        </Text>

                        {/* Phone Input */}
                        <View style={[styles.phoneInputContainer, errors.mobile ? styles.errorBorder : null]}>
                            <View style={styles.flagContainer}>
                                <Image
                                    source={{ uri: 'https://res.cloudinary.com/ddirrlngo/image/upload/v1772697939/india_flag_bifvus.png' }}
                                    style={styles.flagIcon}
                                />
                                <Text style={styles.countryCode}>+91</Text>
                            </View>
                            <View style={styles.verticalDivider} />
                            <TextInput
                                style={styles.textInput}
                                placeholder="Enter the Mobile Number"
                                placeholderTextColor="#888"
                                keyboardType="numeric"
                                value={mobileNumber}
                                onChangeText={t => {
                                    setMobileNumber(t);
                                    setErrors(prev => ({ ...prev, mobile: '' }));
                                }}
                                maxLength={10}
                            />
                        </View>
                        {errors.mobile ? <Text style={styles.errorText}>{errors.mobile}</Text> : null}

                        {/* Send OTP Button */}
                        <TouchableOpacity style={styles.sendOtpButton} onPress={handleSendOTP} activeOpacity={0.8}>
                            <Text style={styles.sendOtpText}>{otpSent ? 'RESEND OTP' : 'SEND OTP'}</Text>
                        </TouchableOpacity>

                        {otpSent && resendTimer > 0 && (
                            <Text style={styles.timerText}>Resend OTP in {resendTimer}s</Text>
                        )}

                        {/* OTP Boxes — shown after Send OTP */}
                        {otpSent && (
                            <Animated.View style={[styles.otpSection, { opacity: otpAnim, transform: [{ translateY: otpTranslateY }] }]}>
                                <Text style={styles.inputLabel}>Enter OTP</Text>

                                <View style={styles.otpBoxRow}>
                                    {otp.map((digit, i) => (
                                        <TextInput
                                            key={i}
                                            ref={otpRefs[i]}
                                            style={[styles.otpBox, digit ? styles.otpBoxFilled : null]}
                                            value={digit}
                                            onChangeText={t => handleOtpChange(t, i)}
                                            onKeyPress={({ nativeEvent }) => handleOtpKeyPress(nativeEvent.key, i)}
                                            keyboardType="number-pad"
                                            maxLength={1}
                                            textAlign="center"
                                            selectTextOnFocus
                                        />
                                    ))}
                                </View>
                                {errors.otp ? <Text style={styles.errorText}>{errors.otp}</Text> : null}
                            </Animated.View>
                        )}




                        {/* Owner Name */}
                        <Text style={styles.inputLabel}>
                            Owner Name <Text style={styles.required}>*</Text>
                        </Text>
                        <View style={[styles.inputContainer, errors.ownerName ? styles.errorBorder : null]}>
                            <TextInput
                                style={styles.textInputFull}
                                placeholder="Enter Your Full Name"
                                placeholderTextColor="#888"
                                value={ownerName}
                                onChangeText={t => {
                                    setOwnerName(t);
                                    setErrors(prev => ({ ...prev, ownerName: '' }));
                                }}
                            />
                        </View>
                        {errors.ownerName ? <Text style={styles.errorText}>{errors.ownerName}</Text> : null}

                        {/* Shop Name */}
                        <Text style={styles.inputLabel}>
                            Shop Name <Text style={styles.required}>*</Text>
                        </Text>
                        <View style={[styles.inputContainer, errors.shopName ? styles.errorBorder : null]}>
                            <TextInput
                                style={styles.textInputFull}
                                placeholder="Enter Your shop Name"
                                placeholderTextColor="#888"
                                value={shopName}
                                onChangeText={t => {
                                    setShopName(t);
                                    setErrors(prev => ({ ...prev, shopName: '' }));
                                }}
                            />
                        </View>
                        {errors.shopName ? <Text style={styles.errorText}>{errors.shopName}</Text> : null}

                        {/* Create Account Button */}
                        <TouchableOpacity style={styles.createAccountButton} onPress={handleCreateAccount} activeOpacity={0.8}>
                            <Text style={styles.createAccountText}>Create an Account</Text>
                        </TouchableOpacity>

                        {/* Terms */}
                        <Text style={styles.termsText}>
                            By Signing Up , You Agree to the{' '}
                            <Text style={styles.termsHighlight}>Term & Condition</Text>
                        </Text>

                        <View style={styles.divider} />

                        <TouchableOpacity onPress={navigateToLogin} activeOpacity={0.6}>
                            <Text style={styles.loginTextContainer}>
                                Already have an account ?{' '}
                                <Text style={styles.loginTextHighlight}>Login Here</Text>
                            </Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: '#ffffff' },
    scrollContent: { flexGrow: 1, width: '100%' },
    cardContainer: { width: '100%', backgroundColor: '#ffffff', padding: 20, flex: 1 },
    logo: { width: 45, height: 45, resizeMode: 'contain', marginBottom: 20 },
    titleContainer: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
    titleOrange: { color: '#ff7a00' },
    titleGreen: { color: '#0c3b2e' },
    phoneInputContainer: {
        height: 55, borderRadius: 12, backgroundColor: '#f3e6c9',
        flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12,
        marginBottom: 4, borderWidth: 1, borderColor: '#e8d4a6',
    },
    flagContainer: { flexDirection: 'row', alignItems: 'center' },
    flagIcon: { width: 24, height: 16, marginRight: 6, resizeMode: 'cover', borderRadius: 2 },
    countryCode: { fontSize: 16, fontWeight: '500', color: '#000', marginRight: 10 },
    verticalDivider: { width: 1, height: 30, backgroundColor: '#000', marginRight: 10, opacity: 0.8 },
    textInput: { flex: 1, fontSize: 15, color: '#000', padding: 0 },
    sendOtpButton: {
        backgroundColor: '#f28c28', height: 48, borderRadius: 10,
        alignItems: 'center', justifyContent: 'center',
        marginTop: 12, marginBottom: 6,
        shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 3,
        shadowOffset: { width: 0, height: 2 }, elevation: 4,
    },
    sendOtpText: { color: '#ffffff', fontWeight: 'bold', fontSize: 16 },
    timerText: { textAlign: 'center', fontSize: 12, color: '#888', marginBottom: 8 },
    otpSection: { marginBottom: 16 },
    otpHintBox: {
        backgroundColor: '#fff8e1', borderLeftWidth: 3,
        borderLeftColor: '#f28c28', borderRadius: 8, padding: 10, marginBottom: 12,
    },
    otpHintText: { fontSize: 12, color: '#555' },
    otpHintCode: { fontWeight: '800', color: '#f28c28', fontSize: 14 },
    otpBoxRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
    otpBox: {
        flex: 1, height: 52, borderWidth: 1.5, borderColor: '#e8d4a6',
        borderRadius: 10, backgroundColor: '#f3e6c9',
        fontSize: 20, fontWeight: '700', color: '#1a1a1a', textAlign: 'center',
    },
    otpBoxFilled: { borderColor: '#f28c28', backgroundColor: '#fff4e8' },
    inputLabel: { fontSize: 15, fontWeight: '500', marginBottom: 6, color: '#000', marginTop: 8 },
    required: { color: '#e53935' },
    inputContainer: {
        height: 50, borderRadius: 12, backgroundColor: '#f3e6c9',
        paddingHorizontal: 12, marginBottom: 4,
        borderWidth: 1, borderColor: '#e8d4a6', justifyContent: 'center',
    },
    textInputFull: { flex: 1, fontSize: 15, color: '#000', padding: 0 },
    errorBorder: { borderColor: '#e53935' },
    errorText: { color: '#e53935', fontSize: 12, marginBottom: 8, marginLeft: 4 },
    createAccountButton: {
        backgroundColor: '#000000', height: 55, borderRadius: 12,
        alignItems: 'center', justifyContent: 'center', marginTop: 16, marginBottom: 12,
    },
    createAccountText: { color: '#ffffff', fontSize: 17, fontWeight: 'bold' },
    termsText: { fontSize: 12, color: '#777', textAlign: 'center', marginBottom: 5 },
    termsHighlight: { color: '#ff7a00', fontWeight: '500' },
    divider: { height: 1, backgroundColor: '#dddddd', marginVertical: 10, width: '100%' },
    loginTextContainer: { fontSize: 13, textAlign: 'center', color: '#000', marginTop: 5 },
    loginTextHighlight: { color: '#ff7a00', fontWeight: 'bold' },
});

export default VendorRegisterScreen;