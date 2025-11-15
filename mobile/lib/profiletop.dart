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

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        //Profile Picture
        //User Info
        children: [
          CircleAvatar(
            radius: 40,
            backgroundColor: NantaColors.accentForeground,
          ),
          SizedBox(height: 20),
          Text(firstName),
          Text(lastName),
          Text(email),
        ],
      ),
    );
  }
}
