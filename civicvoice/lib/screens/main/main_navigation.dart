import 'package:flutter/material.dart';
import '../../utils/app_theme.dart';
import 'home_screen.dart';
import 'complaints_screen.dart';
import 'leaderboard_screen.dart';
import 'profile_screen.dart';

class MainNavigation extends StatefulWidget {
  const MainNavigation({super.key});

  @override
  State<MainNavigation> createState() => _MainNavigationState();
}

class _MainNavigationState extends State<MainNavigation> {
  int _currentIndex = 0;

  final List<Widget> _screens = [
    const HomeScreen(),
    const ComplaintsScreen(),
    const LeaderboardScreen(),
    const ProfileScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _screens[_currentIndex],
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          color: AppTheme.white,
          boxShadow: [
            BoxShadow(
              color: AppTheme.black.withValues(alpha: 0.1),
              blurRadius: 20,
              offset: const Offset(0, -5),
            ),
          ],
        ),
        child: SafeArea(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 8),
            child: BottomNavigationBar(
              currentIndex: _currentIndex,
              onTap: (index) {
                setState(() {
                  _currentIndex = index;
                });
              },
              type: BottomNavigationBarType.fixed,
              backgroundColor: Colors.transparent,
              selectedItemColor: AppTheme.primaryGreen,
              unselectedItemColor: AppTheme.grey,
              elevation: 0,
              selectedFontSize: 12,
              unselectedFontSize: 12,
              items: [
                BottomNavigationBarItem(
                  icon: _buildNavIcon(Icons.home_outlined, 0),
                  activeIcon: _buildNavIcon(Icons.home, 0, isActive: true),
                  label: 'Home',
                ),
                BottomNavigationBarItem(
                  icon: _buildNavIcon(Icons.report_outlined, 1),
                  activeIcon: _buildNavIcon(Icons.report, 1, isActive: true),
                  label: 'Complaints',
                ),
                BottomNavigationBarItem(
                  icon: _buildNavIcon(Icons.leaderboard_outlined, 2),
                  activeIcon: _buildNavIcon(Icons.leaderboard, 2, isActive: true),
                  label: 'Leaderboard',
                ),
                BottomNavigationBarItem(
                  icon: _buildNavIcon(Icons.person_outline, 3),
                  activeIcon: _buildNavIcon(Icons.person, 3, isActive: true),
                  label: 'Profile',
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildNavIcon(IconData icon, int index, {bool isActive = false}) {
    return Container(
      padding: const EdgeInsets.all(8),
      decoration: BoxDecoration(
        color: isActive ? AppTheme.primaryGreen.withValues(alpha: 0.1) : Colors.transparent,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Icon(
        icon,
        size: 24,
        color: isActive ? AppTheme.primaryGreen : AppTheme.grey,
      ),
    );
  }
}