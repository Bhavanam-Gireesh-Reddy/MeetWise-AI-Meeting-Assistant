# 🔐 Security Best Practices

## How Secrets Are Protected

### ✅ What's Done
- `SARVAM_API_KEY` — Never in code
- `GROQ_API_KEY` — Never in code
- `MONGO_URI` — Never in code (if contains password)
- `SECRET_KEY` — Never in code
- `.env` in `.gitignore` — Prevents accidental commits

### ⚠️ What NOT To Do
❌ Don't hardcode API keys in `.py` files  
❌ Don't commit `.env` files  
❌ Don't push credentials to GitHub  
❌ Don't share `.env` in Slack/Email  
❌ Don't use same keys for dev + production  

---

## Environment Variable Management

### Local Development (.env)
```env
# Create locally, NEVER push
SARVAM_API_KEY=your_dev_key_here
GROQ_API_KEY=your_dev_key_here
MONGO_URI=mongodb://localhost:27017
SECRET_KEY=dev_secret_key_32_chars_min
```

### Production (Railway/Render Dashboard)
```
Set variables in platform UI instead:
Settings → Environment Variables
```

Do NOT use `.env` in production!

---

## Credential Rotation

If **ANY** secret is exposed:

### Step 1: Revoke Immediately
```bash
1. Sarvam API — https://sarvam.ai/settings
2. Groq API — https://console.groq.com/settings
3. MongoDB Atlas — https://www.mongodb.com/account/security
4. GitHub — Settings → Security → Authorized OAuth Apps
```

### Step 2: Generate New Credentials
- Get fresh API keys from each platform
- Generate new SECRET_KEY:
  ```bash
  python -c "import secrets; print(secrets.token_hex(32))"
  ```

### Step 3: Update Everywhere
- Local `.env`
- Railway/Render dashboard
- Any other deployment

### Step 4: Force Push (If Secrets in Git History)
```bash
# Only if secrets were committed
git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch .env' --prune-empty --tag-name-filter cat -r

git push origin --force --all
git push origin --force --tags
```

> ⚠️ WARNING: This rewrites git history — only do if absolutely necessary!

---

## Git Security

### Prevent Accidental Commits

#### Option 1: Git Hooks (Automatic)
```bash
# Create .git/hooks/pre-commit
#!/bin/bash
if git diff --cached | grep -E "SARVAM_API_KEY|GROQ_API_KEY|mongodb\+srv"; then
    echo "❌ ERROR: Secrets detected in staged files!"
    exit 1
fi
```

#### Option 2: Git Config
```bash
# Prevent pushing .env
git config core.hooksPath .githooks

# Or set global
git config --global core.excludesFile ~/.gitignore_global
```

### Check What's Staged Before Commit
```bash
git diff --cached # Review before committing
```

---

## Safe Practices Checklist

### Before Each Commit
- [ ] Run `git status` — no `.env` file shown
- [ ] Run `git diff --staged` — no API keys visible
- [ ] `.gitignore` includes `.env`, `.env.*`, `*.pem`, `*.key`

### Before Pushing
```bash
# Check commit history for secrets
git log -p --all | grep -i "api_key\|password\|secret\|token"
```

### Regular Audits
- [ ] Review `DEPLOYMENT.md` quarterly
- [ ] Rotate API keys every 90 days (best practice)
- [ ] Check GitHub Security tab for alerts
- [ ] Monitor MongoDB Atlas for suspicious access

---

## What If Secrets ARE Exposed?

### 1. **Revoke Immediately**
All exposed credentials are now compromised!
```bash
# Immediately invalidate at each service
Sarvam, Groq, MongoDB, etc.
```

### 2. **Generate New Credentials**
```bash
# Get fresh API keys from each platform
# Generate new SECRET_KEY
python -c "import secrets; print(secrets.token_hex(32))"
```

### 3. **Update All Locations**
- Update local `.env`
- Update Railway/Render environment variables
- Update any other deployment

### 4. **Clean Git History** (If in commits)
```bash
# Only if secrets got pushed!
git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch .env' --prune-empty --tag-name-filter cat -r

# Force push to reset history
git push origin --force --all
git push origin --force --tags
```

### 5. **Notify Team** (If shared repo)
- Let all contributors know
- Have them pull updated history

---

## File Patterns to Protect

Ensure `.gitignore` includes:
```gitignore
# Secrets
.env
.env.local
.env.*.local
.env.production

# Keys
*.pem
*.key
*.crt
*.der
secrets.yml
secrets.json

# IDE secrets
.vscode/settings.json
.idea/credentials.xml

# OS
.DS_Store
Thumbs.db
```

---

## Environment-Specific Secrets

### Development (.env - local only)
```env
SARVAM_API_KEY=dev_key_xxx
GROQ_API_KEY=dev_key_yyy
MONGO_URI=mongodb://localhost:27017
SECRET_KEY=dev_secret_32_chars
```

### Staging (Environment variables in platform)
```
SARVAM_API_KEY=staging_key_xxx
GROQ_API_KEY=staging_key_yyy
MONGO_URI=mongodb+srv://staging_user:pass@...
SECRET_KEY=staging_secret_32_chars
```

### Production (Secrets in secure vault)
```
SARVAM_API_KEY=prod_key_xxx
GROQ_API_KEY=prod_key_yyy
MONGO_URI=mongodb+srv://prod_user:pass@... (restricted IP)
SECRET_KEY=prod_secret_64_chars_strong
```

---

## Tools: Secret Detection

### Pre-commit Scanning
```bash
# Install git secret scanner
pip install detect-secrets

# Scan repository
detect-secrets scan --all-files

# Create baseline
detect-secrets scan --baseline .secrets.baseline
```

### GitHub Secret Scanning
- Automatically detects common patterns
- Alerts sent to repo owner
- Scanner checks pushes in real-time

### Manual Check Before Push
```bash
# Search for common patterns
git diff HEAD~1 | grep -i "api_key\|password\|secret\|token\|mongodb"
```

---

## Emergency: Exposed MongoDB Atlas

If MongoDB URI (with password) is exposed:

### Immediately:
1. **Revoke Database User**
   - MongoDB Atlas → Network Access → Database Users
   - Delete the compromised user
   - Create new user with strong password

2. **Change IP Whitelist**
   - Add only known IPs (remove 0.0.0.0/0)
   - Block suspicious IPs

3. **Review Audit Logs**
   - MongoDB Atlas → Logs
   - Check for unauthorized access

4. **Update Connection String**
   - Use new database user credentials
   - Update in all deployments

5. **Enable Encryption**
   - At-rest encryption (M2+ clusters)
   - In-transit SSL/TLS

---

## Summary: Secure Deployment

| Item | Location | Access |
|------|----------|--------|
| `.env` | Local machine only | None (in `.gitignore`) |
| `SECRET_KEY` | Environment variables | Platform only |
| `SARVAM_API_KEY` | Environment variables | Platform only |
| `GROQ_API_KEY` | Environment variables | Platform only |
| `MONGO_URI` | Environment variables | Platform only |

---

## Questions?

- GitHub Security: https://github.com/settings/security
- MongoDB Security: https://docs.mongodb.com/manual/security/
- OWASP Secret Management: https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html

**Remember: Your `.env` file should NEVER be committed. It's your responsibility!** 🔒
