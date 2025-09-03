import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../utils/app_theme.dart';
import '../complaints/add_complaint_screen.dart';

class ComplaintsScreen extends StatefulWidget {
  const ComplaintsScreen({super.key});

  @override
  State<ComplaintsScreen> createState() => _ComplaintsScreenState();
}

class _ComplaintsScreenState extends State<ComplaintsScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Complaints'),
        bottom: TabBar(
          controller: _tabController,
          indicatorColor: AppTheme.white,
          labelColor: AppTheme.white,
          unselectedLabelColor: AppTheme.white.withValues(alpha: 0.7),
          tabs: const [
            Tab(text: 'All'),
            Tab(text: 'My Reports'),
            Tab(text: 'Trending'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          _buildAllComplaints(),
          _buildMyComplaints(),
          _buildTrendingComplaints(),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.of(context).push(
            MaterialPageRoute(
              builder: (context) => const AddComplaintScreen(),
            ),
          );
        },
        backgroundColor: AppTheme.primaryGreen,
        child: const Icon(Icons.add, color: AppTheme.white),
      ),
    );
  }

  Widget _buildAllComplaints() {
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: 10,
      itemBuilder: (context, index) {
        return _buildComplaintCard(
          'Pothole on Main Street #${index + 1}',
          'Roads',
          'Reported by John Doe',
          '2 hours ago',
          index % 3 == 0 ? 'Resolved' : index % 3 == 1 ? 'In Progress' : 'Pending',
          index % 3 == 0 ? AppTheme.lightGreen : index % 3 == 1 ? Colors.orange : AppTheme.errorRed,
          25 + index,
        );
      },
    );
  }

  Widget _buildMyComplaints() {
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: 3,
      itemBuilder: (context, index) {
        return _buildComplaintCard(
          'My Report #${index + 1}',
          'Sanitation',
          'Reported by You',
          '${index + 1} day${index == 0 ? '' : 's'} ago',
          index == 0 ? 'In Progress' : index == 1 ? 'Resolved' : 'Pending',
          index == 0 ? Colors.orange : index == 1 ? AppTheme.lightGreen : AppTheme.errorRed,
          15 + index * 5,
        );
      },
    );
  }

  Widget _buildTrendingComplaints() {
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: 5,
      itemBuilder: (context, index) {
        return _buildComplaintCard(
          'Trending Issue #${index + 1}',
          'Water Supply',
          'Multiple reports',
          '1 hour ago',
          'In Progress',
          Colors.orange,
          50 + index * 10,
        );
      },
    );
  }

  Widget _buildComplaintCard(
    String title,
    String category,
    String reporter,
    String time,
    String status,
    Color statusColor,
    int upvotes,
  ) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppTheme.white,
        borderRadius: BorderRadius.circular(12),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.05),
            blurRadius: 10,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: AppTheme.primaryGreen.withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Text(
                  category,
                  style: GoogleFonts.poppins(
                    fontSize: 10,
                    fontWeight: FontWeight.w500,
                    color: AppTheme.primaryGreen,
                  ),
                ),
              ),
              const Spacer(),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: statusColor.withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Text(
                  status,
                  style: GoogleFonts.poppins(
                    fontSize: 10,
                    fontWeight: FontWeight.w500,
                    color: statusColor,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Text(
            title,
            style: GoogleFonts.poppins(
              fontSize: 16,
              fontWeight: FontWeight.w600,
              color: AppTheme.black,
            ),
          ),
          const SizedBox(height: 8),
          Row(
            children: [
              Icon(
                Icons.person,
                size: 14,
                color: AppTheme.grey,
              ),
              const SizedBox(width: 4),
              Text(
                reporter,
                style: GoogleFonts.poppins(
                  fontSize: 12,
                  color: AppTheme.grey,
                ),
              ),
              const SizedBox(width: 16),
              Icon(
                Icons.access_time,
                size: 14,
                color: AppTheme.grey,
              ),
              const SizedBox(width: 4),
              Text(
                time,
                style: GoogleFonts.poppins(
                  fontSize: 12,
                  color: AppTheme.grey,
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Row(
            children: [
              InkWell(
                onTap: () {
                  // Handle upvote
                },
                child: Row(
                  children: [
                    Icon(
                      Icons.thumb_up_outlined,
                      size: 16,
                      color: AppTheme.primaryGreen,
                    ),
                    const SizedBox(width: 4),
                    Text(
                      '$upvotes',
                      style: GoogleFonts.poppins(
                        fontSize: 12,
                        fontWeight: FontWeight.w500,
                        color: AppTheme.primaryGreen,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(width: 16),
              InkWell(
                onTap: () {
                  // Handle comment
                },
                child: Row(
                  children: [
                    Icon(
                      Icons.comment_outlined,
                      size: 16,
                      color: AppTheme.grey,
                    ),
                    const SizedBox(width: 4),
                    Text(
                      'Comment',
                      style: GoogleFonts.poppins(
                        fontSize: 12,
                        color: AppTheme.grey,
                      ),
                    ),
                  ],
                ),
              ),
              const Spacer(),
              InkWell(
                onTap: () {
                  // Handle share
                },
                child: Icon(
                  Icons.share_outlined,
                  size: 16,
                  color: AppTheme.grey,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}