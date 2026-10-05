import json
import os

transcript_path = '/home/joao-gama/.gemini/antigravity/brain/edaf3508-c6e3-4d0e-9be5-bfd48a5eb86b/.system_generated/logs/transcript_full.jsonl'
files_found = {}

with open(transcript_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            entry = json.loads(line)
            tool_calls = entry.get('tool_calls', [])
            for call in tool_calls:
                name = call.get('name', '')
                if 'write_to_file' in name:
                    args = call.get('args', {})
                    target = args.get('TargetFile')
                    content = args.get('CodeContent')
                    if target and content and target.startswith('/home/joao-gama/Desktop/studio-lar-luz/'):
                        files_found[target] = content
        except Exception as e:
            pass

print(f'Found {len(files_found)} files to restore.')

for path, content in files_found.items():
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'Restored {path} ({len(content)} bytes)')

# Patch 1: UgcGallery.tsx Instagram -> InstagramIcon
ugc_path = '/home/joao-gama/Desktop/studio-lar-luz/components/home/UgcGallery.tsx'
if os.path.exists(ugc_path):
    with open(ugc_path, 'r', encoding='utf-8') as f:
        c = f.read()
    c = c.replace("import { Instagram } from 'lucide-react';", "import { InstagramIcon } from '../common/SocialIcons';")
    c = c.replace('<Instagram className="w-3.5 h-3.5" />', '<InstagramIcon className="w-3.5 h-3.5" />')
    with open(ugc_path, 'w', encoding='utf-8') as f:
        f.write(c)

# Patch 2: Footer.tsx Instagram/Facebook -> SocialIcons
footer_path = '/home/joao-gama/Desktop/studio-lar-luz/components/layout/Footer.tsx'
if os.path.exists(footer_path):
    with open(footer_path, 'r', encoding='utf-8') as f:
        c = f.read()
    c = c.replace("import { Instagram, Facebook, ShieldCheck, Mail, Phone } from 'lucide-react';",
                  "import { ShieldCheck, Mail, Phone } from 'lucide-react';\nimport { InstagramIcon, FacebookIcon } from '../common/SocialIcons';")
    c = c.replace('<Instagram className="w-4 h-4" />', '<InstagramIcon className="w-4 h-4" />')
    c = c.replace('<Facebook className="w-4 h-4" />', '<FacebookIcon className="w-4 h-4" />')
    with open(footer_path, 'w', encoding='utf-8') as f:
        f.write(c)

# Patch 3: Pix route Stripe params
pix_path = '/home/joao-gama/Desktop/studio-lar-luz/app/api/checkout/pix/route.ts'
if os.path.exists(pix_path):
    with open(pix_path, 'r', encoding='utf-8') as f:
        c = f.read()
    if '} as any);' not in c:
        c = c.replace('});', '} as any);')
    with open(pix_path, 'w', encoding='utf-8') as f:
        f.write(c)

print('Restoration & patching completed successfully.')
