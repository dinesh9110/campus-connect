export interface FlutterFile {
  name: string;
  path: string;
  language: string;
  content: string;
}

export const FLUTTER_CODEBASE: FlutterFile[] = [
  {
    name: "pubspec.yaml",
    path: "pubspec.yaml",
    language: "yaml",
    content: `name: campus_connect
description: A premium modern college campus social platform for networking, career building, and direct student chat.
version: 1.0.0+1

environment:
  sdk: '>=3.0.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  google_fonts: ^6.1.0
  flutter_animate: ^4.5.0
  iconsax: ^0.0.8
  font_awesome_flutter: ^10.6.0
  provider: ^6.1.1
  lottie: ^3.1.0
  flutter_svg: ^2.0.9
  cached_network_image: ^3.3.1
  smooth_page_indicator: ^1.1.0
  animated_text_kit: ^4.2.2

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0

flutter:
  uses-material-design: true
  assets:
    - assets/icons/
    - assets/images/
    - assets/animations/`
  },
  {
    name: "app_colors.dart",
    path: "lib/utils/app_colors.dart",
    language: "dart",
    content: `import 'package:flutter/material.dart';

class AppColors {
  // Brand Gradients and Base colors (Futuristic Cyber-Premium Theme)
  static const Color background = Color(0xFF0B0E14);
  static const Color surface = Color(0xFF151A24);
  static const Color surfaceVar = Color(0xFF1E2638);
  
  static const Color primary = Color(0xFF6366F1); // Royal Indigo
  static const Color secondary = Color(0xFF22D3EE); // Neon Cyan
  static const Color accent = Color(0xFFEC4899); // Electric Hot Pink
  
  static const Color textPrimary = Color(0xFFF8FAFC);
  static const Color textSecondary = Color(0xFF94A3B8);
  static const Color textMuted = Color(0xFF64748B);
  
  static const Color success = Color(0xFF10B981);
  static const Color warning = Color(0xFFF59E0B);
  static const Color error = Color(0xFFEF4444);
  
  // Custom Gradients
  static const Gradient primaryGradient = LinearGradient(
    colors: [primary, Color(0xFF4F46E5)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  static const Gradient cyberGradient = LinearGradient(
    colors: [primary, secondary],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  static const Gradient neonPinkGradient = LinearGradient(
    colors: [accent, Color(0xFFD946EF)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  static const Gradient darkGlassGradient = LinearGradient(
    colors: [Color(0x331E293B), Color(0x0F0F172A)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );
}`
  },
  {
    name: "app_styles.dart",
    path: "lib/utils/app_styles.dart",
    language: "dart",
    content: `import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'app_colors.dart';

class AppStyles {
  // Apple Level Clean Typography
  static TextStyle get display => GoogleFonts.spaceGrotesk(
    fontSize: 32,
    fontWeight: FontWeight.bold,
    color: AppColors.textPrimary,
    letterSpacing: -0.5,
  );

  static TextStyle get headingLarge => GoogleFonts.spaceGrotesk(
    fontSize: 26,
    fontWeight: FontWeight.bold,
    color: AppColors.textPrimary,
    letterSpacing: -0.2,
  );

  static TextStyle get headingMedium => GoogleFonts.spaceGrotesk(
    fontSize: 20,
    fontWeight: FontWeight.w600,
    color: AppColors.textPrimary,
  );

  static TextStyle get bodyLarge => GoogleFonts.inter(
    fontSize: 16,
    fontWeight: FontWeight.normal,
    color: AppColors.textPrimary,
  );

  static TextStyle get bodyMedium => GoogleFonts.inter(
    fontSize: 14,
    color: AppColors.textSecondary,
  );

  static TextStyle get caption => GoogleFonts.inter(
    fontSize: 12,
    fontWeight: FontWeight.w500,
    color: AppColors.textMuted,
  );

  static TextStyle get buttonText => GoogleFonts.spaceGrotesk(
    fontSize: 16,
    fontWeight: FontWeight.bold,
    color: Colors.white,
    letterSpacing: 0.5,
  );

  // Modern Glass and Shadow Presets
  static BoxDecoration glassDeco({
    double radius = 16,
    Color borderColor = const Color(0x1FFFFFFF),
  }) {
    return BoxDecoration(
      color: AppColors.surface.withOpacity(0.65),
      borderRadius: BorderRadius.circular(radius),
      border: Border.all(color: borderColor, width: 1.5),
      boxShadow: [
        BoxShadow(
          color: Colors.black.withOpacity(0.25),
          blurRadius: 20,
          offset: const Offset(0, 10),
        ),
      ],
    );
  }
}`
  },
  {
    name: "app_constants.dart",
    path: "lib/utils/app_constants.dart",
    language: "dart",
    content: `class AppConstants {
  static const String appName = "Campus Connect";
  static const String appTagline = "Connecting Students • Building Careers";
  
  // Navigation Routes
  static const String splash = "/splash";
  static const String onboarding = "/onboarding";
  static const String login = "/login";
  static const String signup = "/signup";
  static const String forgotPassword = "/forgot-password";
  static const String otpVerif = "/otp-verif";
  static const String home = "/home";
  static const String search = "/search";
  static const String chat = "/chat";
  static const String profile = "/profile";
  static const String notifications = "/notifications";
  static const String settings = "/settings";

  // Shared Pref / Storage Keys (Stubs for real implementors)
  static const String hasSeenOnboarding = "hasSeenOnboarding";
  static const String authToken = "authToken";
}`
  },
  {
    name: "validators.dart",
    path: "lib/utils/validators.dart",
    language: "dart",
    content: `class Validators {
  static String? validateEmail(String? value) {
    if (value == null || value.isEmpty) {
      return 'Email address is required';
    }
    final emailRegex = RegExp(r'^[^@]+@[^@]+\\.[^@]+');
    if (!emailRegex.hasMatch(value)) {
      return 'Please enter a valid academic/work email';
    }
    return null;
  }

  static String? validatePassword(String? value) {
    if (value == null || value.isEmpty) {
      return 'Password is required';
    }
    if (value.length < 6) {
      return 'Password must contain at least 6 characters';
    }
    return null;
  }

  static String? validateName(String? value) {
    if (value == null || value.isEmpty) {
      return 'Full Name is required';
    }
    if (value.trim().split(' ').length < 2) {
      return 'Please enter both first and last names';
    }
    return null;
  }

  static String? validateOTP(String? value) {
    if (value == null || value.length != 4) {
      return 'Please fill all 4 verification digits';
    }
    return null;
  }
}`
  },
  {
    name: "user_model.dart",
    path: "lib/models/user_model.dart",
    language: "dart",
    content: `class UserModel {
  final String uid;
  final String fullName;
  final String email;
  final String avatarUrl;
  final String department;
  final String classOf;
  final List<String> skills;
  final List<String> achievements;
  final Map<String, int> stats;

  UserModel({
    required this.uid,
    required this.fullName,
    required this.email,
    required this.avatarUrl,
    required this.department,
    required this.classOf,
    required this.skills,
    required this.achievements,
    required this.stats,
  });

  factory UserModel.mock() {
    return UserModel(
      uid: "usr_82319",
      fullName: "Alex Rivera",
      email: "alex.rivera@campus.edu",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      department: "Computer Science & Design",
      classOf: "2027",
      skills: ["Flutter • Dart", "Python", "UI/UX Design", "Machine Learning", "Product Strategy"],
      achievements: [
        "🏆 Primary Winner - HackMit 2026",
        "💡 Lead Developer - Smart Campus IoT Guild",
        "🌟 Top Student Innovator Award",
      ],
      stats: {
        "Connections": 342,
        "Opportunities": 18,
        "Projects": 7,
      },
    );
  }

  UserModel copyWith({
    String? fullName,
    String? email,
    String? avatarUrl,
    String? department,
    String? classOf,
    List<String>? skills,
  }) {
    return UserModel(
      uid: this.uid,
      fullName: fullName ?? this.fullName,
      email: email ?? this.email,
      avatarUrl: avatarUrl ?? this.avatarUrl,
      department: department ?? this.department,
      classOf: classOf ?? this.classOf,
      skills: skills ?? this.skills,
      achievements: this.achievements,
      stats: this.stats,
    );
  }
}`
  },
  {
    name: "auth_provider.dart",
    path: "lib/providers/auth_provider.dart",
    language: "dart",
    content: `import 'package:flutter/material.dart';
import '../models/user_model.dart';
import '../services/auth_service.dart';

class AuthProvider extends ChangeNotifier {
  final AuthService _authService = AuthService();
  
  UserModel? _currentUser;
  bool _isLoading = false;
  String? _errorMessage;

  UserModel? get currentUser => _currentUser;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;
  bool get isAuthenticated => _currentUser != null;

  void cleanErrors() {
    _errorMessage = null;
    notifyListeners();
  }

  Future<bool> login(String email, String password) async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      final user = await _authService.signInWithEmail(email, password);
      _currentUser = user;
      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _errorMessage = e.toString();
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  Future<bool> signup(String name, String email, String password) async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      final user = await _authService.signUp(name, email, password);
      _currentUser = user;
      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _errorMessage = e.toString();
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  Future<bool> sendResetLink(String email) async {
    _isLoading = true;
    notifyListeners();
    await Future.delayed(const Duration(seconds: 1)); // Simulate server ping
    _isLoading = false;
    notifyListeners();
    return true;
  }

  Future<bool> verifyOTP(String pin) async {
    _isLoading = true;
    notifyListeners();
    await Future.delayed(const Duration(seconds: 1));
    _isLoading = false;
    notifyListeners();
    return pin == "1234" || pin.length == 4;
  }

  void updateProfile(UserModel updatedUser) {
    _currentUser = updatedUser;
    notifyListeners();
  }

  void logout() {
    _currentUser = null;
    notifyListeners();
  }
}`
  },
  {
    name: "auth_service.dart",
    path: "lib/services/auth_service.dart",
    language: "dart",
    content: `import '../models/user_model.dart';

class AuthService {
  // Mock API Authentication Flow
  Future<UserModel> signInWithEmail(String email, String password) async {
    await Future.delayed(const Duration(milliseconds: 1500)); // Simulate round trip
    
    if (email.contains("error") || password == "error123") {
      throw Exception("Invalid academic credentials or server down");
    }
    
    return UserModel.mock().copyWith(email: email);
  }

  Future<UserModel> signUp(String name, String email, String password) async {
    await Future.delayed(const Duration(milliseconds: 1800));
    
    if (email.contains("exists")) {
      throw Exception("An account already exists with that email identifier");
    }
    
    return UserModel(
      uid: "usr_\${DateTime.now().millisecondsSinceEpoch.toString().substring(8)}",
      fullName: name,
      email: email,
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      department: "Awaiting Verification",
      classOf: "2028",
      skills: ["Onboarding Progress"],
      achievements: ["🎉 Joined Campus Connect Ecosystem"],
      stats: {"Connections": 0, "Opportunities": 0, "Projects": 0},
    );
  }
}`
  },
  {
    name: "custom_button.dart",
    path: "lib/widgets/custom_button.dart",
    language: "dart",
    content: `import 'package:flutter/material.dart';
import '../utils/app_colors.dart';
import '../utils/app_styles.dart';

class CustomButton extends StatelessWidget {
  final String text;
  final VoidCallback onPressed;
  final bool isLoading;
  final Gradient gradient;
  final double height;
  final double radius;

  const CustomButton({
    Key? key,
    required this.text,
    required this.onPressed,
    this.isLoading = false,
    this.gradient = AppColors.primaryGradient,
    this.height = 56,
    this.radius = 16,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      height: height,
      decoration: BoxDecoration(
        gradient: gradient,
        borderRadius: BorderRadius.circular(radius),
        boxShadow: [
          BoxShadow(
            color: (gradient.colors.first).withOpacity(0.4),
            blurRadius: 15,
            offset: const Offset(0, 6),
          ),
        ],
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: isLoading ? null : onPressed,
          borderRadius: BorderRadius.circular(radius),
          child: Center(
            child: isLoading
                ? const SizedBox(
                    width: 24,
                    height: 24,
                    child: CircularProgressIndicator(
                      color: Colors.white,
                      strokeWidth: 2.5,
                    ),
                  )
                : Text(
                    text,
                    style: AppStyles.buttonText,
                  ),
          ),
        ),
      ),
    );
  }
}`
  },
  {
    name: "custom_textfield.dart",
    path: "lib/widgets/custom_textfield.dart",
    language: "dart",
    content: `import 'package:flutter/material.dart';
import '../utils/app_colors.dart';
import '../utils/app_styles.dart';

class CustomTextField extends StatelessWidget {
  final TextEditingController controller;
  final String label;
  final String hint;
  final IconData prefixIcon;
  final IconData? suffixIcon;
  final VoidCallback? onSuffixIconPressed;
  final bool obscureText;
  final TextInputType keyboardType;
  final String? Function(String?)? validator;

  const CustomTextField({
    Key? key,
    required this.controller,
    required this.label,
    required this.hint,
    required this.prefixIcon,
    this.suffixIcon,
    this.onSuffixIconPressed,
    this.obscureText = false,
    this.keyboardType = TextInputType.text,
    this.validator,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: AppStyles.caption,
        ),
        const SizedBox(height: 8),
        TextFormField(
          controller: controller,
          obscureText: obscureText,
          keyboardType: keyboardType,
          validator: validator,
          cursorColor: AppColors.primary,
          style: AppStyles.bodyLarge,
          decoration: InputDecoration(
            hintText: hint,
            hintStyle: AppStyles.bodyMedium.copyWith(color: AppColors.textMuted),
            prefixIcon: Icon(prefixIcon, color: AppColors.textSecondary, size: 20),
            suffixIcon: suffixIcon != null
                ? IconButton(
                    icon: Icon(suffixIcon, color: AppColors.textSecondary, size: 20),
                    onPressed: onSuffixIconPressed,
                  )
                : null,
            filled: true,
            fillColor: AppColors.surface,
            contentPadding: const EdgeInsets.symmetric(vertical: 18, horizontal: 16),
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(16),
              borderSide: const BorderSide(color: Color(0x1FDDDDDD)),
            ),
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(16),
              borderSide: const BorderSide(color: Color(0x0FFFFFFF)),
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(16),
              borderSide: const BorderSide(color: AppColors.primary, width: 2),
            ),
            errorBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(16),
              borderSide: const BorderSide(color: AppColors.error),
            ),
            focusedErrorBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(16),
              borderSide: const BorderSide(color: AppColors.error, width: 2),
            ),
          ),
        ),
      ],
    );
  }
}`
  },
  {
    name: "social_button.dart",
    path: "lib/widgets/social_button.dart",
    language: "dart",
    content: `import 'package:flutter/material.dart';
import '../utils/app_colors.dart';
import '../utils/app_styles.dart';

class SocialButton extends StatelessWidget {
  final Widget icon;
  final String label;
  final VoidCallback onTap;

  const SocialButton({
    Key? key,
    required this.icon,
    required this.label,
    required this.onTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: AppStyles.glassDeco(radius: 16),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: onTap,
          borderRadius: BorderRadius.circular(16),
          child: Padding(
            padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 24),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                icon,
                const SizedBox(width: 12),
                Text(
                  label,
                  style: AppStyles.bodyLarge.copyWith(fontWeight: FontWeight.w600),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}`
  },
  {
    name: "animated_card.dart",
    path: "lib/widgets/animated_card.dart",
    language: "dart",
    content: `import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../utils/app_styles.dart';

class AnimatedCard extends StatelessWidget {
  final Widget child;
  final VoidCallback? onTap;
  final double radius;
  final Color? borderColor;

  const AnimatedCard({
    Key? key,
    required this.child,
    this.onTap,
    this.radius = 20,
    this.borderColor,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: AppStyles.glassDeco(
        radius: radius, 
        borderColor: borderColor ?? const Color(0x1FFFFFFF),
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: onTap,
          borderRadius: BorderRadius.circular(radius),
          child: Padding(
            padding: const EdgeInsets.all(18),
            child: child,
          ),
        ),
      ),
    )
    .animate()
    .fade(duration: 400.ms, curve: Curves.easeOut)
    .scale(begin: const Offset(0.95, 0.95), end: const Offset(1, 1), duration: 400.ms, curve: Curves.easeOut);
  }
}`
  },
  {
    name: "app_logo.dart",
    path: "lib/widgets/app_logo.dart",
    language: "dart",
    content: `import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../utils/app_colors.dart';

class AppLogo extends StatelessWidget {
  final double size;
  final bool animate;

  const AppLogo({
    Key? key,
    this.size = 80,
    this.animate = true,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Widget logo = Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        color: AppColors.background,
        borderRadius: BorderRadius.circular(size * 0.3),
        boxShadow: [
          BoxShadow(
            color: AppColors.primary.withOpacity(0.3),
            blurRadius: 30,
            offset: const Offset(0, 10),
          ),
          BoxShadow(
            color: AppColors.secondary.withOpacity(0.2),
            blurRadius: 20,
            offset: const Offset(0, -5),
          ),
        ],
        border: Border.all(
          color: AppColors.primary.withOpacity(0.5),
          width: 2,
        ),
      ),
      child: Stack(
        alignment: Alignment.center,
        children: [
          // Cyberpunk Grid Accent
          CustomPaint(
            size: Size(size, size),
            painter: GridPainter(),
          ),
          // Inner glowing ring
          Container(
            width: size * 0.65,
            height: size * 0.65,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              border: Border.all(
                color: AppColors.secondary.withOpacity(0.6),
                width: 1.5,
              ),
              gradient: RadialGradient(
                colors: [
                  AppColors.primary.withOpacity(0.3),
                  Colors.transparent,
                ],
              ),
            ),
          ),
          // Logo symbol (Double infinity loops intersecting styled as "C")
          Text(
            "C",
            style: TextStyle(
              fontSize: size * 0.45,
              fontWeight: FontWeight.bold,
              fontFamily: 'monospace',
              color: Colors.white,
              shadows: [
                Shadow(
                  color: AppColors.secondary,
                  blurRadius: 10,
                ),
              ],
            ),
          ),
        ],
      ),
    );

    if (animate) {
      return logo
          .animate(onPlay: (controller) => controller.repeat(reverse: true))
          .shimmer(delay: 500.ms, duration: 2500.ms, color: AppColors.secondary.withOpacity(0.4))
          .shake(hz: 0.5, amount: const Offset(1, 1), duration: 2.seconds);
    }
    return logo;
  }
}

class GridPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = AppColors.primary.withOpacity(0.12)
      ..strokeWidth = 1.0;

    final step = size.width / 6;
    for (double i = step; i < size.width; i += step) {
      canvas.drawLine(Offset(i, 0), Offset(i, size.height), paint);
      canvas.drawLine(Offset(0, i), Offset(size.width, i), paint);
    }
  }

  @override
  bool shouldRepaint(CustomPainter oldDelegate) => false;
}`
  },
  {
    name: "loading_widget.dart",
    path: "lib/widgets/loading_widget.dart",
    language: "dart",
    content: `import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../utils/app_colors.dart';
import '../utils/app_styles.dart';

class LoadingWidget extends StatelessWidget {
  final String label;

  const LoadingWidget({
    Key? key,
    this.label = "Synchronizing node...",
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          SizedBox(
            width: 80,
            height: 80,
            child: Stack(
              alignment: Alignment.center,
              children: [
                Container(
                  width: 50,
                  height: 50,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    gradient: AppColors.cyberGradient,
                  ),
                )
                .animate(onPlay: (c) => c.repeat())
                .scale(begin: const Offset(0.7, 0.7), end: const Offset(1.2, 1.2), duration: 1.seconds, curve: Curves.easeInOut)
                .fadeOut(duration: 1.seconds),
                const SizedBox(
                  width: 40,
                  height: 40,
                  child: CircularProgressIndicator(
                    strokeWidth: 3,
                    color: AppColors.secondary,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),
          Text(
            label,
            style: AppStyles.caption.copyWith(letterSpacing: 1),
          )
          .animate(onPlay: (c) => c.repeat(reverse: true))
          .shimmer(duration: 1.5.seconds, color: Colors.white70),
        ],
      ),
    );
  }
}`
  },
  {
    name: "main.dart",
    path: "lib/main.dart",
    language: "dart",
    content: `import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'providers/auth_provider.dart';
import 'screens/splash_screen.dart';
import 'screens/onboarding_screen.dart';
import 'screens/login_screen.dart';
import 'screens/signup_screen.dart';
import 'screens/forgot_password_screen.dart';
import 'screens/otp_verification_screen.dart';
import 'screens/home_screen.dart';
import 'utils/app_colors.dart';
import 'utils/app_constants.dart';

void main() {
  runApp(const CampusConnectApp());
}

class CampusConnectApp extends StatelessWidget {
  const CampusConnectApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
      ],
      child: MaterialApp(
        title: AppConstants.appName,
        debugShowCheckedModeBanner: false,
        themeMode: ThemeMode.dark, // Hardcoded Premium Dark Aesthetic
        darkTheme: ThemeData(
          useMaterial3: true,
          brightness: Brightness.dark,
          scaffoldBackgroundColor: AppColors.background,
          primaryColor: AppColors.primary,
          cardColor: AppColors.surface,
          colorScheme: const ColorScheme.dark(
            primary: AppColors.primary,
            secondary: AppColors.secondary,
            tertiary: AppColors.accent,
            background: AppColors.background,
            surface: AppColors.surface,
            error: AppColors.error,
          ),
        ),
        initialRoute: AppConstants.splash,
        routes: {
          AppConstants.splash: (context) => const SplashScreen(),
          AppConstants.onboarding: (context) => const OnboardingScreen(),
          AppConstants.login: (context) => const LoginScreen(),
          AppConstants.signup: (context) => const SignUpScreen(),
          AppConstants.forgotPassword: (context) => const ForgotPasswordScreen(),
          AppConstants.otpVerif: (context) => const OtpVerificationScreen(),
          AppConstants.home: (context) => const HomeScreen(),
        },
      ),
    );
  }
}`
  },
  {
    name: "splash_screen.dart",
    path: "lib/screens/splash_screen.dart",
    language: "dart",
    content: `import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../widgets/app_logo.dart';
import '../utils/app_colors.dart';
import '../utils/app_styles.dart';
import '../utils/app_constants.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({Key? key}) : super(key: key);

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    _navigateToNext();
  }

  void _navigateToNext() async {
    await Future.delayed(const Duration(milliseconds: 3200));
    if (mounted) {
      Navigator.pushReplacementNamed(context, AppConstants.onboarding);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        width: double.infinity,
        decoration: const BoxDecoration(
          color: AppColors.background,
        ),
        child: Stack(
          alignment: Alignment.center,
          children: [
            // Ambient glowing gradient behind everything
            Positioned(
              top: -100,
              child: Container(
                width: 300,
                height: 300,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: AppColors.primary.withOpacity(0.15),
                  filters: const [
                    // Blur simulated visually in Flutter using Box Shadows or ImageFilters
                  ],
                ),
              ),
            ),
            
            Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                // Glowing Animated Logo
                const AppLogo(size: 110),
                const SizedBox(height: 32),
                
                // Animated App Name
                Text(
                  AppConstants.appName,
                  style: AppStyles.display.copyWith(
                    letterSpacing: 1.5,
                  ),
                )
                .animate()
                .fade(duration: 800.ms, curve: Curves.easeOut)
                .slideY(begin: 0.3, end: 0, duration: 800.ms),
                
                const SizedBox(height: 12),
                
                // Subtitle
                Text(
                  AppConstants.appTagline,
                  textAlign: TextAlign.center,
                  style: AppStyles.bodyMedium.copyWith(
                    fontWeight: FontWeight.w500,
                    letterSpacing: 0.5,
                  ),
                )
                .animate()
                .fade(delay: 500.ms, duration: 800.ms),
              ],
            ),
            
            // Bottom Loading Indicator / Node state
            Positioned(
              bottom: 60,
              child: Column(
                children: [
                  const SizedBox(
                    width: 24,
                    height: 24,
                    child: CircularProgressIndicator(
                      strokeWidth: 2,
                      color: AppColors.secondary,
                    ),
                  ),
                  const SizedBox(height: 12),
                  Text(
                    "SECURE ENCRYPTED NODE CONNECTION",
                    style: AppStyles.caption.copyWith(letterSpacing: 2, fontSize: 10),
                  ),
                ],
              )
              .animate()
              .fade(delay: 1.seconds, duration: 600.ms),
            ),
          ],
        ),
      ),
    );
  }
}`
  },
  {
    name: "onboarding_screen.dart",
    path: "lib/screens/onboarding_screen.dart",
    language: "dart",
    content: `import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:smooth_page_indicator/smooth_page_indicator.dart';
import '../utils/app_colors.dart';
import '../utils/app_styles.dart';
import '../utils/app_constants.dart';
import '../widgets/custom_button.dart';

class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({Key? key}) : super(key: key);

  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  final PageController _pageController = PageController();
  int _currentPage = 0;

  final List<OnboardItem> _list = [
    OnboardItem(
      title: "Connect with Students",
      description: "Break down campus walls. Sync up with intelligent classmates, share workspace resources, and run collaborative peer guilds.",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=500&q=80",
    ),
    OnboardItem(
      title: "Find Opportunities",
      description: "Unlock premium hackathons, research labs, career fairs, and direct internships curated exclusively for your institution.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=500&q=80",
    ),
    OnboardItem(
      title: "Build Your Career",
      description: "Amplify your reputation. Store verifiable skill logs, win career awards, and land interviews with tech-focused startups instantly.",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=500&q=80",
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          // Background Glows
          Positioned(
            right: -100,
            top: 50,
            child: Container(
              width: 300,
              height: 300,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: AppColors.secondary.withOpacity(0.08),
              ),
            ),
          ),
          
          SafeArea(
            child: Column(
              children: [
                // Header with Skip Button
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        AppConstants.appName,
                        style: AppStyles.headingMedium.copyWith(
                          color: AppColors.primary,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      TextButton(
                        onPressed: () => Navigator.pushReplacementNamed(context, AppConstants.login),
                        child: Text(
                          "Skip",
                          style: AppStyles.bodyMedium.copyWith(color: AppColors.textSecondary),
                        ),
                      ),
                    ],
                  ),
                ),
                
                // Page Carousel
                Expanded(
                  child: PageView.builder(
                    controller: _pageController,
                    onPageChanged: (idx) {
                      setState(() {
                        _currentPage = idx;
                      });
                    },
                    itemCount: _list.length,
                    itemBuilder: (context, idx) {
                      final item = _list[idx];
                      return Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 24),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            // Glassmorphism Cover card with image
                            ClipRRect(
                              borderRadius: BorderRadius.circular(28),
                              child: Container(
                                height: 320,
                                width: double.infinity,
                                decoration: AppStyles.glassDeco(radius: 28),
                                child: Stack(
                                  children: [
                                    ColorFiltered(
                                      colorFilter: ColorFilter.mode(
                                        AppColors.primary.withOpacity(0.32),
                                        BlendMode.colorBurn,
                                      ),
                                      child: Image.network(
                                        item.image,
                                        fit: BoxFit.cover,
                                        width: double.infinity,
                                        height: double.infinity,
                                      ),
                                    ),
                                    Container(
                                      decoration: const BoxDecoration(
                                        gradient: LinearGradient(
                                          colors: [Colors.transparent, AppColors.background],
                                          begin: Alignment.topCenter,
                                          end: Alignment.bottomCenter,
                                          stops: [0.5, 1.0],
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                            const SizedBox(height: 40),
                            
                            // Text contents plus slide effect
                            Text(
                              item.title,
                              textAlign: TextAlign.center,
                              style: AppStyles.display,
                            ).animate(target: _currentPage == idx ? 1 : 0)
                             .fade(duration: 400.ms)
                             .slideY(begin: 0.2, end: 0, duration: 400.ms),
                             
                            const SizedBox(height: 16),
                            
                            Text(
                              item.description,
                              textAlign: TextAlign.center,
                              style: AppStyles.bodyMedium.copyWith(
                                height: 1.6,
                              ),
                            ).animate(target: _currentPage == idx ? 1 : 0)
                             .fade(delay: 150.ms, duration: 400.ms),
                          ],
                        ),
                      );
                    },
                  ),
                ),
                
                // Bottom control bars
                Padding(
                  padding: const EdgeInsets.all(24),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      // Smooth Indicator
                      SmoothPageIndicator(
                        controller: _pageController,
                        count: _list.length,
                        effect: const ExpandingDotsEffect(
                          dotHeight: 8,
                          dotWidth: 8,
                          activeDotColor: AppColors.primary,
                          dotColor: AppColors.surfaceVar,
                          expansionFactor: 3.5,
                        ),
                      ),
                      
                      // Smart Navigation CTA
                      SizedBox(
                        width: 140,
                        child: CustomButton(
                          height: 52,
                          text: _currentPage == _list.length - 1 ? "Get Started" : "Next",
                          onPressed: () {
                            if (_currentPage == _list.length - 1) {
                              Navigator.pushReplacementNamed(context, AppConstants.login);
                            } else {
                              _pageController.nextPage(
                                duration: const Duration(milliseconds: 350),
                                curve: Curves.easeInOut,
                              );
                            }
                          },
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class OnboardItem {
  final String title;
  final String description;
  final String image;
  OnboardItem({required this.title, required this.description, required this.image});
}`
  },
  {
    name: "login_screen.dart",
    path: "lib/screens/login_screen.dart",
    language: "dart",
    content: `import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';
import '../utils/app_colors.dart';
import '../utils/app_styles.dart';
import '../utils/app_constants.dart';
import '../utils/validators.dart';
import '../widgets/custom_button.dart';
import '../widgets/custom_textfield.dart';
import '../widgets/social_button.dart';
import '../widgets/app_logo.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({Key? key}) : super(key: key);

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  
  bool _obscurePassword = true;
  bool _rememberMe = true;

  void _submit() async {
    if (!_formKey.currentState!.validate()) return;
    
    final authProvider = Provider.of<AuthProvider>(context, listen: false);
    
    final success = await authProvider.login(
      _emailController.text.trim(),
      _passwordController.text,
    );
    
    if (mounted) {
      if (success) {
        Navigator.pushReplacementNamed(context, AppConstants.home);
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(authProvider.errorMessage ?? "Auth Connection Failed!"),
            backgroundColor: AppColors.error,
          ),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final authProvider = Provider.of<AuthProvider>(context);
    
    return Scaffold(
      body: SingleChildScrollView(
        child: Container(
          height: MediaQuery.of(context).size.height,
          padding: const EdgeInsets.symmetric(horizontal: 24),
          child: Stack(
            alignment: Alignment.center,
            children: [
              // Purple Ambient Glow
              Positioned(
                left: -150,
                bottom: -100,
                child: Container(
                  width: 350,
                  height: 350,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: AppColors.primary.withOpacity(0.12),
                  ),
                ),
              ),
              
              Form(
                key: _formKey,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Brand Logo & Heading
                    Center(
                      child: Column(
                        children: [
                          const AppLogo(size: 80),
                          const SizedBox(height: 24),
                          Text(
                            "Welcome Back",
                            style: AppStyles.headingLarge,
                          )
                          .animate()
                          .fade(duration: 400.ms)
                          .slideY(begin: 0.2, end: 0, duration: 400.ms),
                          const SizedBox(height: 8),
                          Text(
                            "Sign in to reconnect with your campus world",
                            style: AppStyles.bodyMedium,
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 38),
                    
                    // Fields Container with Glow Backdrop
                    Container(
                      padding: const EdgeInsets.all(22),
                      decoration: AppStyles.glassDeco(radius: 24),
                      child: Column(
                        children: [
                          CustomTextField(
                            controller: _emailController,
                            label: "ACADEMIC EMAIL",
                            hint: "name@campus.edu",
                            prefixIcon: Icons.email_outlined,
                            keyboardType: TextInputType.emailAddress,
                            validator: Validators.validateEmail,
                          ),
                          const SizedBox(height: 20),
                          CustomTextField(
                            controller: _passwordController,
                            label: "SECURITY SECRET",
                            hint: "••••••••",
                            obscureText: _obscurePassword,
                            prefixIcon: Icons.lock_outline,
                            suffixIcon: _obscurePassword 
                                ? Icons.visibility_off_outlined 
                                : Icons.visibility_outlined,
                            onSuffixIconPressed: () {
                              setState(() {
                                _obscurePassword = !_obscurePassword;
                              });
                            },
                            validator: Validators.validatePassword,
                          ),
                        ],
                      ),
                    )
                    .animate().fade(delay: 150.ms, duration: 500.ms),
                    
                    const SizedBox(height: 16),
                    
                    // Aux control row
                    Row(
                      mainAxisAlignment: MainAxisAlignment.between,
                      children: [
                        Row(
                          children: [
                            Checkbox(
                              value: _rememberMe,
                              onChanged: (val) {
                                setState(() {
                                  _rememberMe = val ?? true;
                                });
                              },
                              activeColor: AppColors.primary,
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(4),
                              ),
                            ),
                            Text(
                              "Remember me",
                              style: AppStyles.caption,
                            ),
                          ],
                        ),
                        TextButton(
                          onPressed: () => Navigator.pushNamed(context, AppConstants.forgotPassword),
                          child: Text(
                            "Reset PIN?",
                            style: AppStyles.caption.copyWith(color: AppColors.secondary),
                          ),
                        ),
                      ],
                    ),
                    
                    const SizedBox(height: 24),
                    
                    // Gradient Submit CTA
                    CustomButton(
                      text: "Authenticate Node",
                      onPressed: _submit,
                      isLoading: authProvider.isLoading,
                    ),
                    
                    const SizedBox(height: 28),
                    
                    // Third Party Connect Title
                    Center(
                      child: Text(
                        "OR SINGLE-SIGN-ON VIA SECURE AUTH",
                        style: AppStyles.caption,
                      ),
                    ),
                    const SizedBox(height: 20),
                    
                    // SSO Button Grid
                    Row(
                      children: [
                        Expanded(
                          child: SocialButton(
                            icon: const FaIcon(FontAwesomeIcons.google, color: Colors.orange, size: 18),
                            label: "Google",
                            onTap: () {
                              // Scaffold Action simulation
                              ScaffoldMessenger.of(context).showSnackBar(
                                const SnackBar(content: Text("Google academic sandbox launched...")),
                              );
                            },
                          ),
                        ),
                        const SizedBox(width: 16),
                        Expanded(
                          child: SocialButton(
                            icon: const FaIcon(FontAwesomeIcons.github, color: Colors.white, size: 18),
                            label: "GitHub",
                            onTap: () {
                              ScaffoldMessenger.of(context).showSnackBar(
                                const SnackBar(content: Text("GitHub OAuth secure channel open...")),
                              );
                            },
                          ),
                        ),
                      ],
                    ),
                    
                    const SizedBox(height: 38),
                    
                    // Form redirect link
                    Center(
                      child: TextButton(
                        onPressed: () => Navigator.pushReplacementNamed(context, AppConstants.signup),
                        child: Text.rich(
                          TextSpan(
                            text: "Deploying for first time? ",
                            style: AppStyles.bodyMedium,
                            children: const [
                              TextSpan(
                                text: "Register Node",
                                style: TextStyle(color: AppColors.primary, fontWeight: FontWeight.bold),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}`
  },
  {
    name: "signup_screen.dart",
    path: "lib/screens/signup_screen.dart",
    language: "dart",
    content: `import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';
import '../utils/app_colors.dart';
import '../utils/app_styles.dart';
import '../utils/app_constants.dart';
import '../utils/validators.dart';
import '../widgets/custom_button.dart';
import '../widgets/custom_textfield.dart';
import '../widgets/social_button.dart';
import '../widgets/app_logo.dart';

class SignUpScreen extends StatefulWidget {
  const SignUpScreen({Key? key}) : super(key: key);

  @override
  State<SignUpScreen> createState() => _SignUpScreenState();
}

class _SignUpScreenState extends State<SignUpScreen> {
  final _formKey = GlobalKey<FormState>();
  
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _confirmController = TextEditingController();
  
  bool _obscurePassword = true;
  bool _acceptTerms = true;

  void _signup() async {
    if (!_formKey.currentState!.validate()) return;
    if (!_acceptTerms) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text("Please read and accept compliance nodes guidelines"),
          backgroundColor: AppColors.warning,
        ),
      );
      return;
    }
    
    if (_passwordController.text != _confirmController.text) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text("Verification password mismatch! Please verify inputs"),
          backgroundColor: AppColors.error,
        ),
      );
      return;
    }

    final authProvider = Provider.of<AuthProvider>(context, listen: false);
    
    final success = await authProvider.signup(
      _nameController.text.trim(),
      _emailController.text.trim(),
      _passwordController.text,
    );
    
    if (mounted) {
      if (success) {
        // Since OTP screen is required, route they to OTP screen to activate node!
        Navigator.pushReplacementNamed(context, AppConstants.otpVerif);
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(authProvider.errorMessage ?? "Node Deployment Failed!"),
            backgroundColor: AppColors.error,
          ),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final authProvider = Provider.of<AuthProvider>(context);
    
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Tiny top chevron to navigate back
              IconButton(
                icon: const Icon(Icons.arrow_back_ios_new, size: 20, color: AppColors.textPrimary),
                onPressed: () => Navigator.pushReplacementNamed(context, AppConstants.login),
              ),
              const SizedBox(height: 12),
              
              // Frame Intro Text style
              Text(
                "Register New Node",
                style: AppStyles.display,
              ).animate().fade().slideX(begin: -0.1, end: 0),
              
              const SizedBox(height: 6),
              Text(
                "Spin up your unique profile and boot into the digital quad.",
                style: AppStyles.bodyMedium,
              ),
              
              const SizedBox(height: 28),
              
              Form(
                key: _formKey,
                child: Column(
                  children: [
                    // Glass Card Container
                    Container(
                      padding: const EdgeInsets.all(22),
                      decoration: AppStyles.glassDeco(radius: 24),
                      child: Column(
                        children: [
                          CustomTextField(
                            controller: _nameController,
                            label: "LEGITIMATE FULL NAME",
                            hint: "Firstname Lastname",
                            prefixIcon: Icons.badge_outlined,
                            validator: Validators.validateName,
                          ),
                          const SizedBox(height: 16),
                          CustomTextField(
                            controller: _emailController,
                            label: "CAMPUS EMAIL IDENTIFICATION",
                            hint: "student@institution.edu",
                            prefixIcon: Icons.alternate_email,
                            keyboardType: TextInputType.emailAddress,
                            validator: Validators.validateEmail,
                          ),
                          const SizedBox(height: 16),
                          CustomTextField(
                            controller: _passwordController,
                            label: "CREATE PRIVATE SECURITY PIN",
                            hint: "••••••••",
                            obscureText: _obscurePassword,
                            prefixIcon: Icons.looks_one_outlined,
                            validator: Validators.validatePassword,
                          ),
                          const SizedBox(height: 16),
                          CustomTextField(
                            controller: _confirmController,
                            label: "CONFIRM PIN IDENTIFIER",
                            hint: "••••••••",
                            obscureText: _obscurePassword,
                            prefixIcon: Icons.security_outlined,
                          ),
                        ],
                      ),
                    ).animate().fade(delay: 200.ms, duration: 400.ms),
                    
                    const SizedBox(height: 16),
                    
                    // Checkbox list tile
                    Row(
                      children: [
                        Checkbox(
                          value: _acceptTerms,
                          onChanged: (val) {
                            setState(() {
                              _acceptTerms = val ?? true;
                            });
                          },
                          activeColor: AppColors.primary,
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(4)),
                        ),
                        Expanded(
                          child: Text(
                            "I consent to the Decentralized Academic Compliance terms.",
                            style: AppStyles.caption,
                          ),
                        ),
                      ],
                    ),
                    
                    const SizedBox(height: 24),
                    
                    // Primary CTA
                    CustomButton(
                      text: "Initialize Workspace",
                      onPressed: _signup,
                      isLoading: authProvider.isLoading,
                    ),
                    
                    const SizedBox(height: 32),
                    
                    // Redirect back
                    Center(
                      child: TextButton(
                        onPressed: () => Navigator.pushReplacementNamed(context, AppConstants.login),
                        child: Text.rich(
                          TextSpan(
                            text: "Already a registered student? ",
                            style: AppStyles.bodyMedium,
                            children: const [
                              TextSpan(
                                text: "Boot Session",
                                style: TextStyle(color: AppColors.primary, fontWeight: FontWeight.bold),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}`
  },
  {
    name: "forgot_password_screen.dart",
    path: "lib/screens/forgot_password_screen.dart",
    language: "dart",
    content: `import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';
import '../utils/app_colors.dart';
import '../utils/app_styles.dart';
import '../utils/validators.dart';
import '../widgets/custom_button.dart';
import '../widgets/custom_textfield.dart';

class ForgotPasswordScreen extends StatefulWidget {
  const ForgotPasswordScreen({Key? key}) : super(key: key);

  @override
  State<ForgotPasswordScreen> createState() => _ForgotPasswordScreenState();
}

class _ForgotPasswordScreenState extends State<ForgotPasswordScreen> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();

  void _reset() async {
    if (!_formKey.currentState!.validate()) return;
    
    final auth = Provider.of<AuthProvider>(context, listen: false);
    final isDone = await auth.sendResetLink(_emailController.text.trim());
    
    if (mounted && isDone) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text("A security key reset node vector has been dispatched to your academic email."),
          backgroundColor: AppColors.success,
        ),
      );
      Navigator.pop(context); // Go back to login
    }
  }

  @override
  Widget build(BuildContext context) {
    final authProvider = Provider.of<AuthProvider>(context);
    
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new, size: 20),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 20),
            Text(
              "Reset Security Pin",
              style: AppStyles.display,
            ).animate().fade().slideY(begin: 0.1, end: 0),
            
            const SizedBox(height: 12),
            Text(
              "Input your verified institutional key-identifier to dispatch reset vectors.",
              style: AppStyles.bodyMedium,
            ),
            
            const SizedBox(height: 40),
            
            Form(
              key: _formKey,
              child: Container(
                padding: const EdgeInsets.all(22),
                decoration: AppStyles.glassDeco(radius: 24),
                child: Column(
                  children: [
                    CustomTextField(
                      controller: _emailController,
                      label: "VERIFIED NODE ID / EMAIL",
                      hint: "yours@college.edu",
                      prefixIcon: Icons.alternate_email,
                      keyboardType: TextInputType.emailAddress,
                      validator: Validators.validateEmail,
                    ),
                  ],
                ),
              ),
            ).animate().fade(delay: 150.ms),
            
            const SizedBox(height: 32),
            CustomButton(
              text: "Dispatch Reset Vectors",
              onPressed: _reset,
              isLoading: authProvider.isLoading,
            ),
          ],
        ),
      ),
    );
  }
}`
  },
  {
    name: "otp_verification_screen.dart",
    path: "lib/screens/otp_verification_screen.dart",
    language: "dart",
    content: `import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';
import '../utils/app_colors.dart';
import '../utils/app_styles.dart';
import '../utils/app_constants.dart';
import '../widgets/custom_button.dart';

class OtpVerificationScreen extends StatefulWidget {
  const OtpVerificationScreen({Key? key}) : super(key: key);

  @override
  State<OtpVerificationScreen> createState() => _OtpVerificationScreenState();
}

class _OtpVerificationScreenState extends State<OtpVerificationScreen> {
  final List<TextEditingController> _controllers = List.generate(4, (_) => TextEditingController());
  final List<FocusNode> _focusNodes = List.generate(4, (_) => FocusNode());
  
  int _timerCount = 59;
  Timer? _timer;

  @override
  void initState() {
    super.initState();
    _startTimer();
  }

  @override
  void dispose() {
    _timer?.cancel();
    for (var c in _controllers) {
      c.dispose();
    }
    for (var f in _focusNodes) {
      f.dispose();
    }
    super.dispose();
  }

  void _startTimer() {
    _timerCount = 59;
    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (mounted) {
        setState(() {
          if (_timerCount > 0) {
            _timerCount--;
          } else {
            _timer?.cancel();
          }
        });
      }
    });
  }

  void _verify() async {
    String pin = _controllers.map((e) => e.text).join();
    if (pin.length != 4) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Complete the full 4-digit security code.")),
      );
      return;
    }

    final auth = Provider.of<AuthProvider>(context, listen: false);
    final success = await auth.verifyOTP(pin);
    
    if (mounted) {
      if (success) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text("Access Token Registered Successfully!"),
            backgroundColor: AppColors.success,
          ),
        );
        Navigator.pushReplacementNamed(context, AppConstants.home);
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text("PIN verification signature mismatch! Code: 1234"),
            backgroundColor: AppColors.error,
          ),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final authProvider = Provider.of<AuthProvider>(context);
    
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              IconButton(
                icon: const Icon(Icons.arrow_back_ios_new, size: 20),
                onPressed: () => Navigator.pushReplacementNamed(context, AppConstants.login),
              ),
              const SizedBox(height: 24),
              
              Text(
                "Secure Node Activation",
                style: AppStyles.display,
              ).animate().fade().slideY(begin: 0.1, end: 0),
              
              const SizedBox(height: 12),
              
              Text(
                "Verify signature logs! Input the security sequence dispatched to your academic terminal. MOCK KEY IS 1234.",
                style: AppStyles.bodyMedium,
              ),
              
              const SizedBox(height: 48),
              
              // OTP Boxes
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: List.generate(4, (idx) {
                  return SizedBox(
                    width: 64,
                    height: 68,
                    child: Container(
                      decoration: AppStyles.glassDeco(radius: 16),
                      child: TextFormField(
                        controller: _controllers[idx],
                        focusNode: _focusNodes[idx],
                        keyboardType: TextInputType.number,
                        textAlign: TextAlign.center,
                        maxLength: 1,
                        style: AppStyles.headingLarge.copyWith(color: AppColors.secondary),
                        cursorColor: AppColors.primary,
                        decoration: const InputDecoration(
                          counterText: "",
                          border: InputBorder.none,
                          contentPadding: EdgeInsets.zero,
                        ),
                        onChanged: (val) {
                          if (val.isNotEmpty && idx < 3) {
                            _focusNodes[idx + 1].requestFocus();
                          } else if (val.isEmpty && idx > 0) {
                            _focusNodes[idx - 1].requestFocus();
                          }
                        },
                      ),
                    ),
                  ).animate().fade(delay: (100 * idx).ms, duration: 400.ms);
                }),
              ),
              
              const SizedBox(height: 40),
              
              // Resend text
              Center(
                child: Column(
                  children: [
                    Text(
                      _timerCount > 0 
                        ? "Dispatched vector cooldown: \$_timerCount seconds" 
                        : "Verification vector expired.",
                      style: AppStyles.caption,
                    ),
                    const SizedBox(height: 8),
                    if (_timerCount == 0)
                      TextButton(
                        onPressed: () {
                          _startTimer();
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(content: Text("Re-dispatched OTP payload key standard vector...")),
                          );
                        },
                        child: Text(
                          "Re-initiate OTP payload",
                          style: AppStyles.caption.copyWith(color: AppColors.secondary),
                        ),
                      ),
                  ],
                ),
              ),
              
              const SizedBox(height: 48),
              
              CustomButton(
                text: "Activate Terminal Node",
                onPressed: _verify,
                isLoading: authProvider.isLoading,
              ),
            ],
          ),
        ),
      ),
    );
  }
}`
  },
  {
    name: "home_screen.dart",
    path: "lib/screens/home_screen.dart",
    language: "dart",
    content: `import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:iconsax/iconsax.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';
import '../utils/app_colors.dart';
import '../utils/app_styles.dart';
import '../utils/app_constants.dart';
import '../widgets/animated_card.dart';
import '../models/user_model.dart';
import 'profile_screen.dart';
import 'chat_screen.dart';
import 'search_screen.dart';
import 'notifications_screen.dart';
import 'settings_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _currentTab = 0;

  // Tabs structure with dynamic simulated page loads
  late List<Widget> _pages;

  @override
  void initState() {
    super.initState();
    _pages = [
      const DashboardTab(),
      const SearchScreen(),
      const ChatScreen(),
      const NotificationsScreen(),
      const SettingsScreen(),
    ];
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          // Global Space Backdrop
          Container(
            color: AppColors.background,
          ),
          
          IndexedStack(
            index: _currentTab,
            children: _pages,
          ),
          
          // Hovering Glass bottom Navigation Bar
          Positioned(
            bottom: 20,
            left: 16,
            right: 16,
            child: Container(
              height: 72,
              decoration: BoxDecoration(
                color: AppColors.surface.withOpacity(0.85),
                borderRadius: BorderRadius.circular(24),
                border: Border.all(color: const Color(0x1AFFFFFF), width: 1.5),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.4),
                    blurRadius: 20,
                    offset: const Offset(0, 8),
                  ),
                ],
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  _navItem(0, Iconsax.home_trend5, "Home"),
                  _navItem(1, Iconsax.search_normal_1, "Query"),
                  _navItem(2, Iconsax.messages_15, "Comm"),
                  _navItem(3, Iconsax.notification_bing, "Alerts"),
                  _navItem(4, Iconsax.setting_2, "Nodes"),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _navItem(int idx, IconData icon, String label) {
    final bool isSel = _currentTab == idx;
    return InkWell(
      onTap: () {
        setState(() {
          _currentTab = idx;
        });
      },
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            icon,
            color: isSel ? AppColors.secondary : AppColors.textSecondary,
            size: isSel ? 26 : 22,
          )
          .animate(target: isSel ? 1 : 0)
          .scale(begin: const Offset(0.85, 0.85), end: const Offset(1.15, 1.15), duration: 250.ms),
          const SizedBox(height: 4),
          Text(
            label,
            style: AppStyles.caption.copyWith(
              fontSize: 10,
              color: isSel ? AppColors.secondary : AppColors.textMuted,
              fontWeight: isSel ? FontWeight.bold : FontWeight.normal,
            ),
          ),
        ],
      ),
    );
  }
}

// Separate Widget representation for central dashboard
class DashboardTab extends StatelessWidget {
  const DashboardTab({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final user = Provider.of<AuthProvider>(context).currentUser ?? UserModel.mock();
    
    return SafeArea(
      child: ListView(
        padding: const EdgeInsets.fromLTRB(20, 16, 20, 110),
        children: [
          // Appbar
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text("Welcome, innovator", style: AppStyles.caption),
                  const SizedBox(height: 4),
                  Text(
                    user.fullName,
                    style: AppStyles.headingMedium.copyWith(fontSize: 24),
                  ),
                ],
              ),
              GestureDetector(
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (_) => const ProfileScreen()),
                  );
                },
                child: Hero(
                  tag: 'avatar_hero',
                  child: Container(
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      border: Border.all(color: AppColors.secondary, width: 2),
                    ),
                    child: CircleAvatar(
                      radius: 24,
                      backgroundImage: NetworkImage(user.avatarUrl),
                    ),
                  ),
                ),
              ),
            ],
          ),
          
          const SizedBox(height: 24),
          
          // Premium Glass Carousel Banner Card
          Container(
            height: 180,
            width: double.infinity,
            decoration: BoxDecoration(
              gradient: AppColors.cyberGradient,
              borderRadius: BorderRadius.circular(24),
              boxShadow: [
                BoxShadow(
                  color: AppColors.primary.withOpacity(0.3),
                  blurRadius: 15,
                  offset: const Offset(0, 6),
                ),
              ],
            ),
            child: Stack(
              children: [
                // Matrix digital wireframe simulation visually
                Positioned(
                  right: -30,
                  bottom: -30,
                  child: Icon(
                    Iconsax.cpu,
                    size: 200,
                    color: Colors.white.withOpacity(0.08),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(24),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                        decoration: BoxDecoration(
                          color: Colors.black.withOpacity(0.3),
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: Text(
                          "HACKATHON • SYNCING NOW",
                          style: AppStyles.caption.copyWith(color: AppColors.secondary, fontWeight: FontWeight.bold),
                        ),
                      ),
                      const SizedBox(height: 12),
                      Text(
                        "Quantum Synergy 2026",
                        style: AppStyles.headingLarge.copyWith(height: 1.1),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        "Register before June 15 for priority compute pods.",
                        style: AppStyles.bodyMedium.copyWith(color: Colors.white70),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ).animate().slideY(begin: 0.1, end: 0, duration: 450.ms),
          
          const SizedBox(height: 28),
          
          // Quick actions grid
          Text("SYSTEM PORTAL QUICK LINK ACTIONS", style: AppStyles.caption),
          const SizedBox(height: 14),
          Row(
            children: [
              _quickActionCard(Iconsax.flash_1, "Sprint Hub", "Projects", AppColors.primary),
              const SizedBox(width: 14),
              _quickActionCard(Iconsax.briefcase5, "Nexus", "Opportunites", AppColors.secondary),
              const SizedBox(width: 14),
              _quickActionCard(Iconsax.award5, "Pinnacle", "Acreage Awards", AppColors.accent),
            ],
          ),
          
          const SizedBox(height: 28),
          
          // Recent Activities / Feed
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text("LATEST CAMPUS TRANSMISSIONS", style: AppStyles.caption),
              TextButton(
                onPressed: () {},
                child: Text(
                  "Explore Sandbox",
                  style: AppStyles.caption.copyWith(color: AppColors.secondary),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          
          AnimatedCard(
            onTap: () {},
            child: Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: AppColors.surfaceVar,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: const Icon(Iconsax.microphone5, color: Colors.orange),
                ),
                const SizedBox(width: 14),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        "AI Ethics Sandbox Forum Panel",
                        style: AppStyles.bodyLarge.copyWith(fontWeight: FontWeight.bold),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        "Hosted by Dr. Lillian Vance in Hall Auditorium F",
                        style: AppStyles.bodyMedium,
                      ),
                    ],
                  ),
                ),
                const Icon(Icons.arrow_forward_ios, size: 12, color: AppColors.textMuted),
              ],
            ),
          ),
          const SizedBox(height: 14),
          AnimatedCard(
            onTap: () {},
            child: Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: AppColors.surfaceVar,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: const Icon(Iconsax.code5, color: AppColors.secondary),
                ),
                const SizedBox(width: 14),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        "Campus Connect v2.1 Node Patch",
                        style: AppStyles.bodyLarge.copyWith(fontWeight: FontWeight.bold),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        "Optimized direct message encryption pipeline speed",
                        style: AppStyles.bodyMedium,
                      ),
                    ],
                  ),
                ),
                const Icon(Icons.arrow_forward_ios, size: 12, color: AppColors.textMuted),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _quickActionCard(IconData icon, String title, String sub, Color glow) {
    return Expanded(
      child: AnimatedCard(
        onTap: () {},
        borderColor: glow.withOpacity(0.3),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Icon(icon, color: glow, size: 28),
            const SizedBox(height: 16),
            Text(title, style: AppStyles.bodyLarge.copyWith(fontWeight: FontWeight.bold)),
            const SizedBox(height: 4),
            Text(sub, style: AppStyles.caption),
          ],
        ),
      ),
    );
  }
}`
  },
  {
    name: "profile_screen.dart",
    path: "lib/screens/profile_screen.dart",
    language: "dart",
    content: `import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:iconsax/iconsax.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';
import '../utils/app_colors.dart';
import '../utils/app_styles.dart';
import '../utils/app_constants.dart';
import '../models/user_model.dart';
import '../widgets/animated_card.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthProvider>(context);
    final user = auth.currentUser ?? UserModel.mock();
    
    return Scaffold(
      backgroundColor: AppColors.background,
      body: CustomScrollView(
        slivers: [
          // Elegant Header Image & Profile Frame
          SliverAppBar(
            expandedHeight: 240,
            floating: false,
            pinned: true,
            backgroundColor: AppColors.background,
            flexibleSpace: FlexibleSpaceBar(
              background: Stack(
                fit: StackFit.expand,
                children: [
                  Image.network(
                    "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=800&q=80",
                    fit: BoxFit.cover,
                  ),
                  Container(
                    decoration: const BoxDecoration(
                      gradient: LinearGradient(
                        colors: [Colors.transparent, AppColors.background],
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                      ),
                    ),
                  ),
                ],
              ),
            ),
            actions: [
              IconButton(
                icon: const Icon(Iconsax.edit),
                onPressed: () {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text("Syncing Node Settings Matrix... Profile modification state online.")),
                  );
                },
              ),
            ],
          ),
          
          SliverList(
            delegate: SliverChildListDelegate([
              Transform.translate(
                offset: const Offset(0, -50),
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 20),
                  child: Column(
                    children: [
                      // Avatar Hero
                      Hero(
                        tag: 'avatar_hero',
                        child: Container(
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            border: Border.all(color: AppColors.secondary, width: 4),
                            boxShadow: [
                              BoxShadow(
                                color: AppColors.secondary.withOpacity(0.3),
                                blurRadius: 20,
                              ),
                            ],
                          ),
                          child: CircleAvatar(
                            radius: 54,
                            backgroundImage: NetworkImage(user.avatarUrl),
                          ),
                        ),
                      ),
                      const SizedBox(height: 16),
                      
                      // User Info
                      Text(user.fullName, style: AppStyles.display.copyWith(fontSize: 28)),
                      const SizedBox(height: 6),
                      Text(
                        "\${user.department} • Class of \${user.classOf}",
                        style: AppStyles.bodyLarge.copyWith(color: AppColors.secondary, fontWeight: FontWeight.bold),
                      ),
                      const SizedBox(height: 6),
                      Text(user.email, style: AppStyles.caption),
                      
                      const SizedBox(height: 28),
                      
                      // Vector Statistics Panel
                      Row(
                        children: user.stats.entries.map((stat) {
                          return Expanded(
                            child: AnimatedCard(
                              child: Column(
                                children: [
                                  Text(
                                    stat.value.toString(),
                                    style: AppStyles.headingLarge.copyWith(color: AppColors.accent),
                                  ),
                                  const SizedBox(height: 4),
                                  Text(stat.key, style: AppStyles.caption),
                                ],
                              ),
                            ),
                          );
                        }).toList(),
                      ),
                      
                      const SizedBox(height: 28),
                      
                      // Skills Ledger Section
                      _sectionHeader("SKILL LEDGER KEYWORDS"),
                      const SizedBox(height: 12),
                      Wrap(
                        spacing: 8,
                        runSpacing: 8,
                        children: user.skills.map((skill) {
                          return Chip(
                            label: Text(skill, style: AppStyles.caption.copyWith(color: Colors.white)),
                            backgroundColor: AppColors.surface,
                            side: const BorderSide(color: Color(0x11FFFFFF)),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                          );
                        }).toList(),
                      ),
                      
                      const SizedBox(height: 28),
                      
                      // Achievements section
                      _sectionHeader("VERIFIABLE NETWORK ACHIEVEMENTS"),
                      const SizedBox(height: 12),
                      Column(
                        children: user.achievements.map((ach) {
                          return Padding(
                            padding: const EdgeInsets.only(bottom: 12),
                            child: AnimatedCard(
                              child: Row(
                                children: [
                                  const Icon(Iconsax.verify, color: AppColors.secondary, size: 22),
                                  const SizedBox(width: 14),
                                  Expanded(
                                    child: Text(
                                      ach,
                                      style: AppStyles.bodyLarge.copyWith(fontWeight: FontWeight.w600),
                                    ),
                                  ),
                                  const Icon(Iconsax.link, size: 14, color: AppColors.textMuted),
                                ],
                              ),
                            ),
                          );
                        }).toList(),
                      ),
                      
                      const SizedBox(height: 24),
                      
                      // Close session
                      TextButton.icon(
                        style: TextButton.styleFrom(foregroundColor: AppColors.error),
                        onPressed: () {
                          auth.logout();
                          Navigator.pushNamedAndRemoveUntil(context, AppConstants.login, (route) => false);
                        },
                        icon: const Icon(Iconsax.logout, size: 20),
                        label: Text("Terminate Secure Identity Socket", style: AppStyles.headingMedium.copyWith(color: AppColors.error)),
                      ),
                    ],
                  ),
                ),
              ),
            ]),
          ),
        ],
      ),
    );
  }

  Widget _sectionHeader(String title) {
    return Align(
      alignment: Alignment.centerLeft,
      child: Text(
        title,
        style: AppStyles.caption,
      ),
    );
  }
}`
  },
  {
    name: "settings_screen.dart",
    path: "lib/screens/settings_screen.dart",
    language: "dart",
    content: `import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:iconsax/iconsax.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';
import '../utils/app_colors.dart';
import '../utils/app_styles.dart';
import '../widgets/animated_card.dart';

class SettingsScreen extends StatefulWidget {
  const SettingsScreen({Key? key}) : super(key: key);

  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  bool _darkMode = true;
  bool _notifications = true;
  bool _stealthMode = false;

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthProvider>(context);
    
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: Text("System Settings", style: AppStyles.headingMedium),
        backgroundColor: Colors.transparent,
        automaticallyImplyLeading: false,
        elevation: 0,
      ),
      body: ListView(
        padding: const EdgeInsets.fromLTRB(20, 16, 20, 110),
        children: [
          _sectionHeader("SECURITY POLICIES & NODES"),
          const SizedBox(height: 12),
          AnimatedCard(
            child: Column(
              children: [
                _settingsToggle(
                  Iconsax.moon5, 
                  "Immersive Deep Space Viewport", 
                  "Saves OLED power nodes", 
                  _darkMode, 
                  (val) => setState(() => _darkMode = val),
                ),
                const Divider(color: Color(0x0FFFFFFF)),
                _settingsToggle(
                  Iconsax.notification_bing5, 
                  "Event Horizon Dispatches", 
                  "Real-time campus communications", 
                  _notifications, 
                  (val) => setState(() => _notifications = val),
                ),
                const Divider(color: Color(0x0FFFFFFF)),
                _settingsToggle(
                  Iconsax.finger_scan, 
                  "Decentralized Stealth Logs", 
                  "Hide presence vectors on sandboxes", 
                  _stealthMode, 
                  (val) => setState(() => _stealthMode = val),
                ),
              ],
            ),
          ),
          
          const SizedBox(height: 28),
          
          _sectionHeader("SYSTEM SPECIFICATIONS"),
          const SizedBox(height: 12),
          AnimatedCard(
            child: Column(
              children: [
                _infoTile(Iconsax.info_circle, "Client Version", "v2.4.0 Codename: Indigo"),
                const Divider(color: Color(0x0FFFFFFF)),
                _infoTile(Iconsax.link, "Decentralized API Endpoints", "https://api.campus.edu"),
                const Divider(color: Color(0x0FFFFFFF)),
                _infoTile(Iconsax.shield_security, "Node Encrypt Protocols", "Argon2id + AES-256 GCM"),
              ],
            ),
          ),
          
          const SizedBox(height: 38),
          
          // Terminate secure connection
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.error.withOpacity(0.1),
                side: const BorderSide(color: AppColors.error, width: 1.5),
                padding: const EdgeInsets.symmetric(vertical: 16),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              ),
              onPressed: () {
                auth.logout();
                Navigator.pushNamedAndRemoveUntil(context, '/login', (route) => false);
              },
              child: Text(
                "Terminate Encryption Socket",
                style: AppStyles.buttonText.copyWith(color: AppColors.error),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _sectionHeader(String label) {
    return Text(label, style: AppStyles.caption);
  }

  Widget _settingsToggle(IconData icon, String title, String subtitle, bool val, Function(bool) onChanged) {
    return Row(
      children: [
        Icon(icon, color: AppColors.secondary, size: 24),
        const SizedBox(width: 14),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(title, style: AppStyles.bodyLarge.copyWith(fontWeight: FontWeight.w600)),
              const SizedBox(height: 2),
              Text(subtitle, style: AppStyles.bodyMedium),
            ],
          ),
        ),
        Switch(
          value: val,
          onChanged: onChanged,
          activeColor: AppColors.secondary,
        ),
      ],
    );
  }

  Widget _infoTile(IconData icon, String key, String val) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Row(
            children: [
              Icon(icon, color: AppColors.textSecondary, size: 20),
              const SizedBox(width: 12),
              Text(key, style: AppStyles.bodyLarge.copyWith(fontWeight: FontWeight.w500)),
            ],
          ),
          Text(val, style: AppStyles.bodyMedium.copyWith(color: AppColors.secondary)),
        ],
      ),
    );
  }
}`
  },
  {
    name: "notifications_screen.dart",
    path: "lib/screens/notifications_screen.dart",
    language: "dart",
    content: `import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:iconsax/iconsax.dart';
import '../utils/app_colors.dart';
import '../utils/app_styles.dart';
import '../widgets/animated_card.dart';

class NotificationsScreen extends StatefulWidget {
  const NotificationsScreen({Key? key}) : super(key: key);

  @override
  State<NotificationsScreen> createState() => _NotificationsScreenState();
}

class _NotificationsScreenState extends State<NotificationsScreen> {
  final List<AlertPayload> _alerts = [
    AlertPayload(
      id: "al_1",
      title: "Direct message handshake from Prof. Thorne",
      time: "2 mins ago",
      desc: "Node message query regarding deep neural nets workspace upload...",
      isNew: true,
      category: "Academic",
    ),
    AlertPayload(
      id: "al_2",
      title: "Google Sync Internship Match Update",
      time: "1 hour ago",
      desc: "Google campus nexus selected your skill ledger metadata for review...",
      isNew: true,
      category: "Nexus Career",
    ),
    AlertPayload(
      id: "al_3",
      title: "Decentralized Hackathon Winner Announcement",
      time: "1 day ago",
      desc: "HackMit smart campus IoT nodes have awarded Alex Rivera first prize...",
      isNew: false,
      category: "Guild Award",
    ),
    AlertPayload(
      id: "al_4",
      title: "Guild Security Token Issued",
      time: "3 days ago",
      desc: "Your decentralized connection protocol was security verified and certified...",
      isNew: false,
      category: "Node System",
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: Text("Alert Dispatches", style: AppStyles.headingMedium),
        backgroundColor: Colors.transparent,
        automaticallyImplyLeading: false,
        elevation: 0,
        actions: [
          TextButton(
            onPressed: () {
              setState(() {
                for (var element in _alerts) {
                  element.isNew = false;
                }
              });
            },
            child: Text("Clear Badges", style: AppStyles.caption.copyWith(color: AppColors.secondary)),
          ),
        ],
      ),
      body: _alerts.isEmpty
          ? Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Icon(Iconsax.notification_status, size: 60, color: AppColors.textMuted),
                  const SizedBox(height: 16),
                  Text("Zero Alert Dispatches Active", style: AppStyles.bodyLarge),
                ],
              ),
            )
          : ListView.builder(
              padding: const EdgeInsets.fromLTRB(20, 16, 20, 110),
              itemCount: _alerts.length,
              itemBuilder: (context, idx) {
                final alert = _alerts[idx];
                return Dismissible(
                  key: Key(alert.id),
                  background: Container(
                    margin: const EdgeInsets.only(bottom: 14),
                    decoration: BoxDecoration(
                      color: AppColors.error.withOpacity(0.2),
                      borderRadius: BorderRadius.circular(20),
                    ),
                    alignment: Alignment.centerRight,
                    padding: const EdgeInsets.symmetric(horizontal: 24),
                    child: const Icon(Iconsax.trash, color: AppColors.error),
                  ),
                  onDismissed: (direction) {
                    setState(() {
                      _alerts.removeAt(idx);
                    });
                  },
                  child: Padding(
                    padding: const EdgeInsets.only(bottom: 14),
                    child: AnimatedCard(
                      borderColor: alert.isNew ? AppColors.secondary.withOpacity(0.4) : null,
                      child: Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Container(
                            padding: const EdgeInsets.all(10),
                            decoration: BoxDecoration(
                              color: alert.isNew ? AppColors.secondary.withOpacity(0.12) : AppColors.surfaceVar,
                              shape: BoxShape.circle,
                            ),
                            child: Icon(
                              Iconsax.cpu_charge, 
                              color: alert.isNew ? AppColors.secondary : AppColors.textMuted,
                              size: 20,
                            ),
                          ),
                          const SizedBox(width: 14),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: [
                                    Container(
                                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                                      decoration: BoxDecoration(
                                        color: AppColors.surfaceVar,
                                        borderRadius: BorderRadius.circular(8),
                                      ),
                                      child: Text(
                                        alert.category.toUpperCase(),
                                        style: AppStyles.caption.copyWith(color: AppColors.secondary, fontSize: 8),
                                      ),
                                    ),
                                    Text(alert.time, style: AppStyles.caption),
                                  ],
                                ),
                                const SizedBox(height: 8),
                                Text(
                                  alert.title,
                                  style: AppStyles.bodyLarge.copyWith(
                                    fontWeight: alert.isNew ? FontWeight.bold : FontWeight.normal,
                                  ),
                                ),
                                const SizedBox(height: 4),
                                Text(alert.desc, style: AppStyles.bodyMedium),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                );
              },
            ),
    );
  }
}

class AlertPayload {
  final String id;
  final String title;
  final String time;
  final String desc;
  final String category;
  bool isNew;
  AlertPayload({required this.id, required this.title, required this.time, required this.desc, required this.isNew, required this.category});
}`
  },
  {
    name: "search_screen.dart",
    path: "lib/screens/search_screen.dart",
    language: "dart",
    content: `import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:iconsax/iconsax.dart';
import '../utils/app_colors.dart';
import '../utils/app_styles.dart';
import '../widgets/animated_card.dart';

class SearchScreen extends StatefulWidget {
  const SearchScreen({Key? key}) : super(key: key);

  @override
  State<SearchScreen> createState() => _SearchScreenState();
}

class _SearchScreenState extends State<SearchScreen> {
  final TextEditingController _queryController = TextEditingController();
  
  List<String> _results = [];
  bool _searching = false;

  void _runQuery(String txt) async {
    if (txt.isEmpty) {
      setState(() {
        _results = [];
      });
      return;
    }
    
    setState(() {
      _searching = true;
    });

    // Simulate complex vector databases mapping
    await Future.delayed(const Duration(milliseconds: 600));

    setState(() {
      _searching = false;
      _results = [
        "🌐 Web3 Hackathon Guild: Meets Thursdays in CS Labs",
        "🤖 Autonomous Drone IoT Lab: Hiring research aids",
        "🏫 HackMit Team Sync Node: Room 41B",
        "🧬 Neural Engineering Bio-sprints: Open to CS juniors",
      ].where((e) => e.toLowerCase().contains(txt.toLowerCase())).toList();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: Text("Vectored Campus Query", style: AppStyles.headingMedium),
        backgroundColor: Colors.transparent,
        automaticallyImplyLeading: false,
        elevation: 0,
      ),
      body: ListView(
        padding: const EdgeInsets.fromLTRB(20, 16, 20, 110),
        children: [
          // Glassmorphic Search Bar
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            decoration: AppStyles.glassDeco(radius: 16),
            child: TextField(
              controller: _queryController,
              cursorColor: AppColors.secondary,
              style: AppStyles.bodyLarge,
              onChanged: _runQuery,
              decoration: InputDecoration(
                hintText: "Search students, career nodes, guild labs...",
                hintStyle: AppStyles.bodyMedium.copyWith(color: AppColors.textMuted),
                icon: const Icon(Iconsax.search_normal_1, color: AppColors.secondary, size: 22),
                border: InputBorder.none,
              ),
            ),
          ),
          
          const SizedBox(height: 28),
          
          if (_searching)
            const Center(
              child: Padding(
                padding: EdgeInsets.only(top: 40),
                child: CircularProgressIndicator(color: AppColors.secondary),
              ),
            )
          else if (_results.isNotEmpty) ...[
            Text("QUERY VECTOR COINCIDENCES", style: AppStyles.caption),
            const SizedBox(height: 12),
            ..._results.map((item) {
              return Padding(
                padding: const EdgeInsets.only(bottom: 12),
                child: AnimatedCard(
                  onTap: () {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text("Connecting sandbox payload... Link verified for \$item")),
                    );
                  },
                  child: Row(
                    children: [
                      const Icon(Iconsax.cpu_charge, color: AppColors.secondary),
                      const SizedBox(width: 14),
                      Expanded(
                        child: Text(item, style: AppStyles.bodyLarge),
                      ),
                      const Icon(Icons.arrow_forward_ios, size: 12, color: AppColors.textMuted),
                    ],
                  ),
                ),
              );
            }).toList(),
          ] else ...[
            Text("TRENDING NODES ON NETWORK", style: AppStyles.caption),
            const SizedBox(height: 14),
            Row(
              children: [
                _chip("HackMit"),
                const SizedBox(width: 8),
                _chip("DeepLearning"),
                const SizedBox(width: 8),
                _chip("PythonLabs"),
              ],
            ),
            
            const SizedBox(height: 38),
            
            Center(
              child: Column(
                children: [
                  const Icon(Iconsax.microscope5, size: 50, color: AppColors.textMuted),
                  const SizedBox(height: 12),
                  Text(
                    "Search utilizes AI Vector Query Mapping",
                    style: AppStyles.bodyMedium,
                  ),
                ],
              ),
            ),
          ]
        ],
      ),
    );
  }

  Widget _chip(String txt) {
    return ActionChip(
      onPressed: () {
        _queryController.text = txt;
        _runQuery(txt);
      },
      label: Text(txt, style: AppStyles.caption.copyWith(color: Colors.white)),
      backgroundColor: AppColors.surface,
      side: const BorderSide(color: Color(0x1AFFFFFF)),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
    );
  }
}`
  },
  {
    name: "chat_screen.dart",
    path: "lib/screens/chat_screen.dart",
    language: "dart",
    content: `import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:iconsax/iconsax.dart';
import '../utils/app_colors.dart';
import '../utils/app_styles.dart';

class ChatScreen extends StatefulWidget {
  const ChatScreen({Key? key}) : super(key: key);

  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  final List<MessageBubble> _messages = [
    MessageBubble(
      text: "Yo Alex! Finished syncing the Flutter animations payload on the repo?",
      isMe: false,
      timestamp: "09:42",
    ),
    MessageBubble(
      text: "Oh total sync! Running on Material 3 standard nodes perfectly. Check commit usr_82a31.",
      isMe: true,
      timestamp: "09:44",
    ),
    MessageBubble(
      text: "Stellar. Let's showcase the glassmorphism dashboard layout components during Dr. Lillian's peer sandbox review tomorrow.",
      isMe: false,
      timestamp: "09:45",
    ),
  ];

  final TextEditingController _msgController = TextEditingController();

  void _send() {
    if (_msgController.text.trim().isEmpty) return;
    
    setState(() {
      _messages.add(
        MessageBubble(
          text: _msgController.text.trim(),
          isMe: true,
          timestamp: "Just now",
        ),
      );
      _msgController.clear();
    });

    // Smart simulated reply
    Future.delayed(const Duration(milliseconds: 1500), () {
      if (mounted) {
        setState(() {
          _messages.add(
            MessageBubble(
              text: "Acknowledged! Thread received and recorded inside Campus Connect secure node matrix.",
              isMe: false,
              timestamp: "Just now",
            ),
          );
        });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: Row(
          children: [
            Container(
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                border: Border.all(color: AppColors.secondary, width: 1.5),
              ),
              child: const CircleAvatar(
                radius: 18,
                backgroundImage: NetworkImage("https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80"),
              ),
            ),
            const SizedBox(width: 12),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text("Jane Wilde", style: AppStyles.headingMedium.copyWith(fontSize: 16)),
                const SizedBox(height: 2),
                Text("Online Code: Node 23A", style: AppStyles.caption.copyWith(color: AppColors.secondary)),
              ],
            ),
          ],
        ),
        backgroundColor: Colors.transparent,
        automaticallyImplyLeading: false,
        elevation: 0,
      ),
      body: Column(
        children: [
          // Thread Scroll List
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.fromLTRB(20, 16, 20, 4),
              itemCount: _messages.length,
              itemBuilder: (context, idx) {
                final bubble = _messages[idx];
                return Align(
                  alignment: bubble.isMe ? Alignment.centerRight : Alignment.centerLeft,
                  child: Padding(
                    padding: const EdgeInsets.symmetric(vertical: 6),
                    child: Row(
                      mainAxisAlignment: bubble.isMe ? MainAxisAlignment.end : MainAxisAlignment.start,
                      children: [
                        if (!bubble.isMe) ...[
                          const CircleAvatar(
                            radius: 12,
                            backgroundImage: NetworkImage("https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80"),
                          ),
                          const SizedBox(width: 8),
                        ],
                        Flexible(
                          child: Container(
                            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                            decoration: BoxDecoration(
                              color: bubble.isMe ? AppColors.primary : AppColors.surface,
                              borderRadius: BorderRadius.only(
                                topLeft: const Radius.circular(16),
                                topRight: const Radius.circular(16),
                                bottomLeft: bubble.isMe ? const Radius.circular(16) : Radius.zero,
                                bottomRight: bubble.isMe ? Radius.zero : const Radius.circular(16),
                              ),
                              border: Border.all(
                                color: bubble.isMe ? Colors.transparent : const Color(0x11FFFFFF),
                              ),
                            ),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  bubble.text,
                                  style: AppStyles.bodyLarge.copyWith(color: Colors.white, fontSize: 13.5),
                                ),
                                const SizedBox(height: 4),
                                Align(
                                  alignment: Alignment.bottomRight,
                                  child: Text(
                                    bubble.timestamp,
                                    style: AppStyles.caption.copyWith(fontSize: 8, color: Colors.white70),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ],
                    ),
                  )
                  .animate()
                  .fade(duration: 300.ms)
                  .scale(begin: const Offset(0.9, 0.9), delay: 50.ms),
                );
              },
            ),
          ),
          
          // Hover Typing Dispatch Bar
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 8, 16, 110),
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              decoration: AppStyles.glassDeco(radius: 20),
              child: Row(
                children: [
                  Expanded(
                    child: TextField(
                      controller: _msgController,
                      style: AppStyles.bodyLarge,
                      cursorColor: AppColors.secondary,
                      onSubmitted: (_) => _send(),
                      decoration: InputDecoration(
                        hintText: "State payload dispatch parameters...",
                        hintStyle: AppStyles.bodyMedium.copyWith(color: AppColors.textMuted),
                        border: InputBorder.none,
                      ),
                    ),
                  ),
                  IconButton(
                    icon: const Icon(Iconsax.send_1, color: AppColors.secondary),
                    onPressed: _send,
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class MessageBubble {
  final String text;
  final bool isMe;
  final String timestamp;
  MessageBubble({required this.text, required this.isMe, required this.timestamp});
}`
  }
];
