import 'package:flutter/material.dart';
import './profiletop.dart';
import './editaccount.dart';
import 'nanta_colors.dart';

class Profilepage extends StatelessWidget {
  const Profilepage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Profile Page')),
      body: Center(
        child: Column(
          children: [
            const Profiletop(),

            //Change color
            Divider(color: NantaColors.accentForeground, thickness: 3),
            FractionallySizedBox(widthFactor: 0.8, child: const EditAccount()),
          ],
        ),
      ),
    );
  }
}


/* import 'package:flutter/material.dart';

class NewScreen extends StatelessWidget {
  const NewScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('New Screen')),
      body: Center(
        child: Text(
          'Welcome to the new screen!',
          style: TextStyle(fontSize: 20),
        ),
      ),
    );
  }
}
*/