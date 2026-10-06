import json
import os
import sys

# Ensure project root is in python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

from database import engine, Base, SessionLocal
from models import (
    Collection, Item, Page, Chunk, Summary, Translation,
    TimelineEvent, Story, Entity, EntityRelation, Kiosk
)

def run_seed():
    print("Creating all database tables...")
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    seed_file_candidates = [
        os.path.join(os.path.dirname(__file__), "seed_data.json"),
        os.path.join(os.path.dirname(__file__), "data/seed/seed_data.json"),
        os.path.join(os.path.dirname(__file__), "../../data/seed/seed_data.json"),
    ]
    seed_file = next((p for p in seed_file_candidates if os.path.exists(p)), None)
    if not seed_file:
        print(f"Warning: No seed_data.json found in candidate paths: {seed_file_candidates}")
        return

    with open(seed_file, "r", encoding="utf-8") as f:
        data = json.load(f)

    # 1. Collections
    collections = [
        {"id": "col-baws", "name": "Dr. Babasaheb Ambedkar: Writings and Speeches (BAWS)", "description": "Volumes 1 to 22 published by Government of Maharashtra and Dr. Ambedkar Foundation."},
        {"id": "col-cad", "name": "Constituent Assembly Debates (CAD 1946–1949)", "description": "Official parliamentary proceedings and constitutional interventions."},
        {"id": "col-heritage", "name": "Rare Manuscripts, Editorials and Speeches", "description": "Historical periodicals including Mooknayak, Bahishkrit Bharat, and landmark addresses."}
    ]
    for c in collections:
        if not db.query(Collection).filter_by(id=c["id"]).first():
            db.add(Collection(**c))

    # 2. Items, Pages, Chunks, Summaries, Translations
    for item_data in data.get("items", []):
        pages_data = item_data.pop("pages", [])
        existing_item = db.query(Item).filter_by(id=item_data["id"]).first()
        if not existing_item:
            item = Item(**item_data)
            db.add(item)
            db.flush()

            for p_data in pages_data:
                translations_data = p_data.pop("translations", {})
                page = Page(
                    id=f"{item.id}-p{p_data['page_no']}",
                    item_id=item.id,
                    page_no=p_data["page_no"],
                    image_uri=f"/assets/scans/{item.id}_p{p_data['page_no']}.jpg",
                    ocr_text=p_data["ocr_text"],
                    ocr_confidence=p_data.get("ocr_confidence", 0.98),
                    words=p_data.get("words", []),
                    lang=p_data.get("lang", "en"),
                    verified=True
                )
                db.add(page)
                db.flush()

                # Add chunk for search & RAG
                chunk = Chunk(
                    id=f"chunk-{page.id}-01",
                    item_id=item.id,
                    page_id=page.id,
                    text=p_data["ocr_text"],
                    lang=p_data.get("lang", "en"),
                    token_count=len(p_data["ocr_text"].split()),
                    span_start=0,
                    span_end=len(p_data["ocr_text"])
                )
                db.add(chunk)

                # Add translations
                for t_lang, t_text in translations_data.items():
                    db.add(Translation(
                        id=f"trans-{page.id}-{t_lang}",
                        item_id=item.id,
                        page_id=page.id,
                        target_lang=t_lang,
                        text=t_text,
                        engine="Bhashini/IndicTrans2",
                        verified=True
                    ))

            # Add Summary
            db.add(Summary(
                id=f"summary-{item.id}-short",
                item_id=item.id,
                level="short",
                lang="en",
                text=f"Authenticated scholarly overview of {item.title}. Preserved in {item.source}.",
                model="Gemini-Archival-RAG"
            ))

    # 3. Timeline Events
    for te in data.get("timeline_events", []):
        if not db.query(TimelineEvent).filter_by(id=te["id"]).first():
            db.add(TimelineEvent(**te))

    # 4. Stories
    for s in data.get("stories", []):
        if not db.query(Story).filter_by(id=s["id"]).first():
            db.add(Story(**s))

    # 5. Entities
    for e in data.get("entities", []):
        if not db.query(Entity).filter_by(id=e["id"]).first():
            db.add(Entity(**e))

    # 6. Default Kiosk
    if not db.query(Kiosk).filter_by(id="kiosk-daic-main-gallery-01").first():
        db.add(Kiosk(
            id="kiosk-daic-main-gallery-01",
            name="DAIC Gallery Kiosk 01",
            location="Ground Floor Exhibition Hall, DAIC New Delhi",
            content_version="v2.6.0",
            status="online"
        ))

    db.commit()
    db.close()
    print("Database seeding completed successfully.")

if __name__ == "__main__":
    run_seed()
