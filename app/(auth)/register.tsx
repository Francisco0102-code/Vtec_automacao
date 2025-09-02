import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { router } from "expo-router";

const registerConfig = {
  screen: "Register",
  title: "Criar Conta",
  inputs: [
    {
      id: "name",
      label: "Nome completo",
      placeholder: "Digite seu nome",
      secureTextEntry: false
    },
    {
      id: "email",
      label: "E-mail",
      placeholder: "Digite seu e-mail",
      secureTextEntry: false
    },
    {
      id: "password",
      label: "Senha",
      placeholder: "Crie uma senha",
      secureTextEntry: true
    },
    {
      id: "confirmPassword",
      label: "Confirmar senha",
      placeholder: "Repita sua senha",
      secureTextEntry: true
    }
  ],
  buttons: [
    {
      id: "register",
      text: "Cadastrar",
      type: "primary",
      action: "/home"
    },
    {
      id: "login",
      text: "Já tenho conta",
      type: "secondary",
      action: "/login"
    }
  ]
};

export default function RegisterScreen() {
  const [form, setForm] = useState<{ [key: string]: string }>({});

  const handleChange = (id: string, value: string) => {
    setForm({ ...form, [id]: value });
  };

  const handlePress = (action: string, id: string) => {
    if (id === "register") {
      if (form.password !== form.confirmPassword) {
        Alert.alert("Erro", "As senhas não coincidem!");
        return;
      }
      Alert.alert("Sucesso", "Conta criada com sucesso!");
    }
    router.push(action as any);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{registerConfig.title}</Text>

      {registerConfig.inputs.map((input) => (
        <View key={input.id} style={styles.inputGroup}>
          <Text style={styles.label}>{input.label}</Text>
          <TextInput
            style={styles.input}
            placeholder={input.placeholder}
            secureTextEntry={input.secureTextEntry}
            value={form[input.id] || ""}
            onChangeText={(text) => handleChange(input.id, text)}
          />
        </View>
      ))}

      {registerConfig.buttons.map((button) => (
        <TouchableOpacity
          key={button.id}
          style={[
            styles.button,
            button.type === "primary" ? styles.primary : styles.secondary
          ]}
          onPress={() => handlePress(button.action, button.id)}
        >
          <Text
            style={[
              styles.buttonText,
              button.type === "secondary" && { color: "#333" }
            ]}
          >
            {button.text}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#222"
  },
  inputGroup: {
    marginBottom: 15
  },
  label: {
    fontSize: 14,
    color: "#444",
    marginBottom: 5
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16
  },
  button: {
    padding: 15,
    borderRadius: 8,
    marginTop: 15,
    alignItems: "center"
  },
  primary: {
    backgroundColor: "#007bff"
  },
  secondary: {
    backgroundColor: "#f0f0f0"
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff"
  }
});
