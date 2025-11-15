import "package:flutter/material.dart";

class EditAccount extends StatefulWidget {
  const EditAccount({super.key});
  @override
  State<EditAccount> createState() => _EditAccount();
}

class _EditAccount extends State<EditAccount> {
  final TextEditingController _fnameController = TextEditingController();
  final TextEditingController _lnameController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _changePWController = TextEditingController();
  final TextEditingController _confirmController = TextEditingController();

  bool showEditPW = false;

  String firstName = "First Name";
  String lastName = "Last Name";
  String email = "email@gmail.com";
  String changePW = "";
  @override
  Widget build(BuildContext context) {
    return ConstrainedBox(
      constraints: BoxConstraints(
        maxHeight: MediaQuery.of(context).size.height * 0.6,
      ),
      child: Card(
        elevation: 5,
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              SizedBox(height: 20),
              _inputField(_fnameController, firstName),
              SizedBox(height: 20),
              _inputField(_lnameController, lastName),
              SizedBox(height: 20),
              _inputField(_emailController, email),
              SizedBox(height: 20),

              ElevatedButton(
                onPressed: () {
                  setState(() {
                    showEditPW = !showEditPW;
                  });
                },
                child: Text("Change PW"),
              ),
              SizedBox(height: 20),

              if (showEditPW) ...[
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    _passwordFields(_changePWController, changePW),
                    SizedBox(width: 20),

                    _passwordFields(_confirmController, changePW),
                  ],
                ),
              ],
              SizedBox(height: 20),

              ElevatedButton(
                onPressed: () {
                  //
                },
                child: Text("Submit"),
              ),

              SizedBox(height: 20),
            ],
          ),
        ),
      ),
    );
  }

  Widget _inputField(TextEditingController controller, String label) {
    return Container(
      width: MediaQuery.of(context).size.width * 0.4,
      child: TextField(
        controller: controller,
        decoration: InputDecoration(
          labelText: label,
          border: OutlineInputBorder(borderRadius: BorderRadius.circular(80)),
        ),
      ),
    );
  }

  Widget _passwordFields(TextEditingController controller, String label) {
    return Container(
      width: MediaQuery.of(context).size.width * 0.3,
      child: TextField(
        controller: controller,
        decoration: InputDecoration(
          labelText: label,
          border: OutlineInputBorder(borderRadius: BorderRadius.circular(80)),
        ),
      ),
    );
  }
}
