import 'package:flutter/material.dart';
import 'nanta_colors.dart';

class Profiletop extends StatefulWidget {
  const Profiletop({super.key});

  @override
  State<Profiletop> createState() => _ProfileTopState();
}

class _ProfileTopState extends State<Profiletop> {
  String firstName = "First Name";
  String lastName = "Last Name";
  String email = "email@gmail.com";

  // ---------------- PROFILE PIC STATE ----------------
  bool showPicOptions = false;
  int selectedIndex = 0;

  final List<String> profilePics = List.generate(
    12,
    (index) => "assets/profile${index + 1}.jpg",
  );

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,

        // ---------------- PROFILE PICTURE ----------------
        children: [
          Stack(
            alignment: Alignment.center,
            children: [
              CircleAvatar(
                radius: 40,
                backgroundImage: AssetImage(profilePics[selectedIndex]),
              ),

              // Pencil button
              Positioned(
                bottom: 0,
                right: 0,
                child: GestureDetector(
                  onTap: () => setState(() => showPicOptions = !showPicOptions),
                  child: Container(
                    width: 32,
                    height: 32,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: NantaColors.accentForeground,
                    ),
                    child: const Icon(Icons.edit, size: 16, color: Colors.white),
                  ),
                ),
              ),
            ],
          ),

          const SizedBox(height: 10),

          // -------- GRID OF SELECTABLE PFPS --------
          if (showPicOptions)
            Wrap(
              spacing: 10,
              runSpacing: 10,
              children: List.generate(
                profilePics.length,
                (index) => GestureDetector(
                  onTap: () {
                    setState(() {
                      selectedIndex = index; // Save locally
                      showPicOptions = false;
                    });
                  },
                  child: ClipOval(
                    child: Image.asset(
                      profilePics[index],
                      width: 55,
                      height: 55,
                      fit: BoxFit.cover,
                    ),
                  ),
                ),
              ),
            ),

          const SizedBox(height: 20),

          // ---------------- TEXT INFO ----------------
          Text(firstName),
          Text(lastName),
          Text(email),
        ],
      ),
    );
  }
}
