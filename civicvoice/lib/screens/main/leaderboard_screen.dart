import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../utils/app_theme.dart';

class LeaderboardScreen extends StatelessWidget {
  const LeaderboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.backgroundColor,
      appBar: AppBar(
        title: Text(
          'Leaderboard',
          style: GoogleFonts.poppins(
            fontWeight: FontWeight.w600,
            color: AppTheme.white,
          ),
        ),
        backgroundColor: AppTheme.primaryGreen,
        elevation: 0,
        automaticallyImplyLeading: false,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Top Contributors',
              style: GoogleFonts.poppins(
                fontSize: 24,
                fontWeight: FontWeight.w600,
                color: AppTheme.textDark,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              'Citizens making a difference in their community',
              style: GoogleFonts.poppins(fontSize: 14, color: AppTheme.grey),
            ),
            const SizedBox(height: 30),

            // Top 3 Cards
            Row(
              children: [
                Expanded(
                  child: _buildTopCard(
                    2,
                    'Sarah Johnson',
                    45,
                    Icons.emoji_events,
                    Colors.grey,
                  ),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: _buildTopCard(
                    1,
                    'John Smith',
                    67,
                    Icons.emoji_events,
                    Colors.amber,
                  ),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: _buildTopCard(
                    3,
                    'Mike Davis',
                    32,
                    Icons.emoji_events,
                    Colors.orange,
                  ),
                ),
              ],
            ),

            const SizedBox(height: 30),

            // Leaderboard List
            Container(
              decoration: BoxDecoration(
                color: AppTheme.white,
                borderRadius: BorderRadius.circular(16),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withValues(alpha: 0.05),
                    blurRadius: 10,
                    offset: const Offset(0, 2),
                  ),
                ],
              ),
              child: Column(
                children: [
                  _buildLeaderboardItem(
                    4,
                    'Emma Wilson',
                    28,
                    'assets/images/avatar4.png',
                  ),
                  _buildLeaderboardItem(
                    5,
                    'David Brown',
                    24,
                    'assets/images/avatar5.png',
                  ),
                  _buildLeaderboardItem(
                    6,
                    'Lisa Garcia',
                    21,
                    'assets/images/avatar6.png',
                  ),
                  _buildLeaderboardItem(
                    7,
                    'Tom Anderson',
                    19,
                    'assets/images/avatar7.png',
                  ),
                  _buildLeaderboardItem(
                    8,
                    'Amy Taylor',
                    16,
                    'assets/images/avatar8.png',
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTopCard(
    int rank,
    String name,
    int points,
    IconData icon,
    Color color,
  ) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppTheme.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.05),
            blurRadius: 10,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        children: [
          Icon(icon, color: color, size: rank == 1 ? 40 : 32),
          const SizedBox(height: 8),
          Text(
            '#$rank',
            style: GoogleFonts.poppins(
              fontSize: 18,
              fontWeight: FontWeight.w600,
              color: AppTheme.textDark,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            name,
            style: GoogleFonts.poppins(
              fontSize: 12,
              fontWeight: FontWeight.w500,
              color: AppTheme.textDark,
            ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 4),
          Text(
            '$points pts',
            style: GoogleFonts.poppins(
              fontSize: 14,
              fontWeight: FontWeight.w600,
              color: AppTheme.primaryGreen,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildLeaderboardItem(
    int rank,
    String name,
    int points,
    String avatarPath,
  ) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
      decoration: BoxDecoration(
        border: Border(
          bottom: BorderSide(
            color: AppTheme.grey.withValues(alpha: 0.1),
            width: 1,
          ),
        ),
      ),
      child: Row(
        children: [
          Container(
            width: 30,
            height: 30,
            decoration: BoxDecoration(
              color: AppTheme.primaryGreen.withValues(alpha: 0.1),
              borderRadius: BorderRadius.circular(15),
            ),
            child: Center(
              child: Text(
                '#$rank',
                style: GoogleFonts.poppins(
                  fontSize: 12,
                  fontWeight: FontWeight.w600,
                  color: AppTheme.primaryGreen,
                ),
              ),
            ),
          ),
          const SizedBox(width: 16),
          CircleAvatar(
            radius: 20,
            backgroundColor: AppTheme.grey.withValues(alpha: 0.2),
            child: Icon(Icons.person, color: AppTheme.grey, size: 20),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  name,
                  style: GoogleFonts.poppins(
                    fontSize: 16,
                    fontWeight: FontWeight.w500,
                    color: AppTheme.textDark,
                  ),
                ),
                Text(
                  'Active Contributor',
                  style: GoogleFonts.poppins(
                    fontSize: 12,
                    color: AppTheme.grey,
                  ),
                ),
              ],
            ),
          ),
          Text(
            '$points pts',
            style: GoogleFonts.poppins(
              fontSize: 16,
              fontWeight: FontWeight.w600,
              color: AppTheme.primaryGreen,
            ),
          ),
        ],
      ),
    );
  }
}
