import React from "react";
import {
  ScrollView,
  View,
  Text,
  Pressable,
  Switch,
  TextInput,
  StyleSheet,
} from "react-native";

type Config = {
  enabled: boolean;
  notificationEnabled: boolean;
  background: string;
  accent: string;
  glow: boolean;
  duration: number;
  preview: boolean;
  pfpEffects: boolean;
  nameplates: boolean;
  avatarDecorations: boolean;
  profileEffects: boolean;
};

const DEFAULT_CONFIG: Config = {
  enabled: true,
  notificationEnabled: true,
  background: "#090909",
  accent: "#FFD600",
  glow: true,
  duration: 3500,
  preview: true,
  pfpEffects: true,
  nameplates: true,
  avatarDecorations: true,
  profileEffects: true,
};

let config: Config = { ...DEFAULT_CONFIG };

function setConfig<K extends keyof Config>(
  key: K,
  value: Config[K],
) {
  config[key] = value;
}

function resetConfig() {
  config = { ...DEFAULT_CONFIG };
}

function Toggle({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowText}>{label}</Text>

      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{
          false: "#333333",
          true: config.accent,
        }}
        thumbColor="#FFFFFF"
      />
    </View>
  );
}

function ColorInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <View style={styles.block}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        value={value}
        onChangeText={onChange}
        autoCapitalize="characters"
        placeholder="#FFD600"
        placeholderTextColor="#666666"
        style={styles.input}
      />
    </View>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function PresetButton({
  name,
  background,
  accent,
}: {
  name: string;
  background: string;
  accent: string;
}) {
  return (
    <Pressable
      style={[
        styles.preset,
        {
          borderColor: accent,
        },
      ]}
      onPress={() => {
        config.background = background;
        config.accent = accent;
      }}
    >
      <View
        style={[
          styles.presetDot,
          {
            backgroundColor: accent,
          },
        ]}
      />

      <Text style={styles.presetText}>{name}</Text>
    </Pressable>
  );
}

function NotificationPreview() {
  if (!config.notificationEnabled || !config.preview) {
    return null;
  }

  return (
    <View
      style={[
        styles.notification,
        {
          backgroundColor: config.background,
          borderColor: config.accent,
          shadowColor: config.glow
            ? config.accent
            : "#000000",
        },
      ]}
    >
      <View
        style={[
          styles.avatar,
          {
            backgroundColor: config.accent,
          },
        ]}
      >
        <Text style={styles.avatarText}>S</Text>
      </View>

      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>
          ShiggyFX
        </Text>

        <Text style={styles.notificationMessage}>
          Notification preview
        </Text>
      </View>
    </View>
  );
}

function SettingsComponent() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>ShiggyFX</Text>

      <Text style={styles.subtitle}>
        Visual customization
      </Text>

      <Section title="General">
        <Toggle
          label="Enable ShiggyFX"
          value={config.enabled}
          onChange={(value) =>
            setConfig("enabled", value)
          }
        />

        <Toggle
          label="Notification Customizer"
          value={config.notificationEnabled}
          onChange={(value) =>
            setConfig("notificationEnabled", value)
          }
        />

        <Toggle
          label="Message Preview"
          value={config.preview}
          onChange={(value) =>
            setConfig("preview", value)
          }
        />

        <Toggle
          label="Glow Effect"
          value={config.glow}
          onChange={(value) =>
            setConfig("glow", value)
          }
        />
      </Section>

      <Section title="Notification">
        <ColorInput
          label="Notification Background"
          value={config.background}
          onChange={(value) =>
            setConfig("background", value)
          }
        />

        <ColorInput
          label="Accent Color"
          value={config.accent}
          onChange={(value) =>
            setConfig("accent", value)
          }
        />

        <Text style={styles.info}>
          Duration: {config.duration} ms
        </Text>
      </Section>

      <Section title="Presets">
        <PresetButton
          name="Naruto Yellow"
          background="#090909"
          accent="#FFD600"
        />

        <PresetButton
          name="AMOLED"
          background="#000000"
          accent="#FFFFFF"
        />

        <PresetButton
          name="Gold"
          background="#090909"
          accent="#FFB300"
        />

        <PresetButton
          name="Orange"
          background="#090909"
          accent="#FF6D00"
        />
      </Section>

      <Section title="Profile Effects">
        <Toggle
          label="PFP Effects"
          value={config.pfpEffects}
          onChange={(value) =>
            setConfig("pfpEffects", value)
          }
        />

        <Toggle
          label="Custom Nameplates"
          value={config.nameplates}
          onChange={(value) =>
            setConfig("nameplates", value)
          }
        />

        <Toggle
          label="Avatar Decorations"
          value={config.avatarDecorations}
          onChange={(value) =>
            setConfig("avatarDecorations", value)
          }
        />

        <Toggle
          label="Profile Effects"
          value={config.profileEffects}
          onChange={(value) =>
            setConfig("profileEffects", value)
          }
        />
      </Section>

      <Section title="Preview">
        <NotificationPreview />
      </Section>

      <Pressable
        style={[
          styles.resetButton,
          {
            borderColor: config.accent,
          },
        ]}
        onPress={resetConfig}
      >
        <Text
          style={[
            styles.resetText,
            {
              color: config.accent,
            },
          ]}
        >
          RESET SETTINGS
        </Text>
      </Pressable>
    </ScrollView>
  );
}

function start() {
  console.log("[ShiggyFX] Started");
}

function stop() {
  console.log("[ShiggyFX] Stopped");
}

export default {
  start,
  stop,
  SettingsComponent,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },

  content: {
    padding: 16,
    paddingBottom: 40,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "800",
  },

  subtitle: {
    color: "#888888",
    fontSize: 14,
    marginTop: 3,
    marginBottom: 18,
  },

  section: {
    marginBottom: 22,
    padding: 14,
    backgroundColor: "#090909",
    borderRadius: 14,
  },

  sectionTitle: {
    color: "#FFD600",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 12,
  },

  row: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#222222",
  },

  rowText: {
    color: "#FFFFFF",
    fontSize: 15,
  },

  block: {
    marginBottom: 12,
  },

  label: {
    color: "#AAAAAA",
    fontSize: 13,
    marginBottom: 6,
  },

  input: {
    color: "#FFFFFF",
    backgroundColor: "#151515",
    borderRadius: 9,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#292929",
  },

  info: {
    color: "#777777",
    fontSize: 12,
    marginTop: 4,
  },

  preset: {
    height: 48,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  presetDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    marginRight: 10,
  },

  presetText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },

  notification: {
    minHeight: 72,
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 10,
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  avatarText: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "900",
  },

  notificationContent: {
    flex: 1,
  },

  notificationTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },

  notificationMessage: {
    color: "#AAAAAA",
    fontSize: 13,
    marginTop: 3,
  },

  resetButton: {
    borderWidth: 1,
    borderRadius: 10,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
  },

  resetText: {
    fontWeight: "800",
    fontSize: 13,
  },
});